import * as fs from "fs";
import IUser from "../interfaces/User";
import IAuthData from "../interfaces/AuthData";
import crypto from "crypto";
import dayjs from "dayjs";

export default class userResolver
{
    public static instance: userResolver;
    private ALIVE_DURATION = 3600000; // 1 heure de connection max
    private CHECK_DELAY = 30000; // vérification toutes les 30 sec.

    private _userData: IUser[] = require("../../JSON/users.json");
    private _modificationThreshold: number = 0;
    private _modificationCounter: number = 0;

    private _connectedPool: Map<string, dayjs.Dayjs>;

    public constructor()
    {
        this._connectedPool = new Map<string, dayjs.Dayjs>();

        setInterval(this._purge, this.CHECK_DELAY);
    }

    public static create(): userResolver
    {
        if (userResolver.instance == null)
        {
            userResolver.instance = new userResolver();
        }

        return userResolver.instance;
    }

    // @Internal
    private _purge = () =>
    {
        this._connectedPool.forEach((disconnectTime, user) =>
        {
            if (disconnectTime.isBefore(dayjs()))
            {
                this._connectedPool.delete(user);
                console.log("disconnected: " + user);
            }
        });
    }

    public connect = ({ nickname, hash }) =>
    {
        nickname = nickname as String;
        hash = hash as String;
        let user = this._userData.find(u => u.nickname == nickname && u.hash == hash);

        if (user !== undefined)
        {
            let uid = user.uid;
            let auth: IAuthData = {
                uid: uid,
                token: crypto.randomBytes(50).toString("hex")
            }
            let disconnectTime = dayjs().add(this.ALIVE_DURATION, "ms");
            this._connectedPool.set(auth.token, disconnectTime);
            return auth;
        }
        else throw new Error("NOT_FOUND");
    }

    public isConnected = (auth: IAuthData): boolean =>
    {
        let bypass = false;
        console.log(auth);
        console.log(this._connectedPool.has(auth.token) || bypass);
        return this._connectedPool.has(auth.token);
    }

    public disconnect = ({ auth }) =>
    {
        this._connectedPool.delete(auth);

        return "utilisateur déconnecté";
    }

    // @internal
    public addToHistory = ({ uid, element }) =>
    {
        let index = this._userData.findIndex(u => u.uid == uid);
        this._userData[index].history.push(element);
        this._saveUserData();
    }

    public getHistory = ({ auth }) =>
    {
        auth = auth as IAuthData;
        if (this.isConnected(auth))
        {
            return this._userData.find(u => u.uid == auth.uid).history;
        }
        else throw new Error("Connexion invalide");
    }

    public getWishlist = ({ auth }) =>
    {
        auth = auth as IAuthData;
        if (this.isConnected(auth))
        {
            return this._userData.find(u => u.uid == auth.uid).wishlist;
        }
        else throw new Error("Connexion invalide");
    }

    //@internal
    public hasBoughtProduct = (uid: string, p_uid: string) =>
    {
        let index = this._userData.findIndex(u => u.uid == uid);
        return this._userData[index].history.includes({ product: p_uid, type: "BUY" });
    }

    public addToWishlist = ({ auth, product }) =>
    {
        auth = auth as IAuthData;
        product = product as string;

        if (this.isConnected(auth))
        {
            let index = this._userData.findIndex(u => u.uid == auth.uid);
            this._userData[index].wishlist.push(product);
            this._saveUserData();
            return "Liste de souhaits modifiée";
        }
        else throw new Error("Connexion invalide");
    }

    public removeFromWishlist = ({ auth, product }) =>
    {
        auth = auth as IAuthData;
        product = product as string;

        if (this.isConnected(auth))
        {
            let index = this._userData.findIndex(u => u.uid == auth.uid);
            let productIndex = this._userData[index].wishlist.findIndex(p => p == product);
            this._userData[index].wishlist.slice(productIndex, 1);

            this._saveUserData();
            return "Liste de souhaits mise a jour";
        }
        else throw new Error("Connexion invalide");
    }

    public getUser = ({ auth }) =>
    {
        auth = auth as IAuthData;
        if (this.isConnected(auth))
        {
            return this._userData.find(u => u.uid == auth.uid);
        }
        else throw new Error("Connexion invalide");
    }

    //méthode open, pas besoin de connexion
    public getNotation = ({ target_uid }) =>
    {
        target_uid = target_uid as string;

        return this._userData.find(u => u.uid == target_uid).notation;
    }

    //méthode open, pas besoin de connexion
    public getNickname = ({ uid }) =>
    {
        uid = uid as string;
        return this._userData.find(u => u.uid == uid).nickname;
    }

    public createUser = ({ nickname, email, password }) =>
    {
        nickname = nickname as string;
        email = email as string;
        password = password as string;

        if (!this._userData.find(u => u.nickname == nickname || u.email == email))
        {
            let uid = crypto.createHash("sha256").update(email + nickname).digest("hex");
            let user: IUser = {
                uid: uid,
                hash: password,
                nickname: nickname,
                email: email,
                wishlist: [],
                totalSales: 0,
                notation: 0,
                history: []
            }

            this._userData.unshift(user);
            this._saveUserData();

            return uid;
        }
        else throw new Error("Identifiants déjà utilisés");
    }

    public updateUser = ({ auth, email, password, }) =>
    {
        //TODO ?
    }

    private _saveUserData = () =>
    {
        if (this._modificationCounter < this._modificationThreshold)
        {
            this._modificationCounter++;
        }
        else
        {
            let userDataString = JSON.stringify(this._userData, null, 4);
            fs.writeFileSync("JSON/users.json", userDataString, { encoding: "utf-8", flag: "w" });
            console.log("--- Saved users", this._userData);
            this._modificationCounter = 0;
        }
    }

}