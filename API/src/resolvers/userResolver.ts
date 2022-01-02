import * as fs from "fs";
import IUser from "../interfaces/User";
import IAuthData from "../interfaces/AuthData";
import crypto from "crypto";

export default class userResolver {
    public static instance: userResolver;
    private ALIVE_DURATION =  3600000; // 1 heure de connection max
    private CHECK_DELAY = 30000; // vérification toutes les 30 sec.

    private _userData : IUser[] = require("../../JSON/users.json");
    private _modificationThreshold: number = 10;
    private _modificationCounter: number = 0;

    private _connectedPool: Map<IAuthData, Date>;

    public constructor() {
        this._connectedPool = new Map<IAuthData, Date>();

        setInterval(this._purge, this.CHECK_DELAY);
    }

    public static create() : userResolver{
        if (userResolver.instance == null) {
            userResolver.instance = new userResolver();
        }

        return userResolver.instance;
    }

    // @Internal
    private _purge = () => {
        let threshold = new Date();
        this._connectedPool.forEach((disconnectTime, user) => {
            if (disconnectTime > threshold) {
                this._connectedPool.delete(user);
            }
        });
    }

    public connect = ({nickname, hash}) => {
        nickname = nickname as String;
        hash = hash as String;

        let uid = this._userData.find(u => u.nickname == nickname && u.hash == hash).uid;

        if (uid != null) {
            let auth : IAuthData = {
                uid: uid,
                token: crypto.randomBytes(50).toString("hex")
            }
            let disconnectTime = new Date(Date.now() + this.ALIVE_DURATION);
            this._connectedPool.set(auth, disconnectTime);

            return auth;
        }
    }

    public isConnected = (auth: IAuthData) : boolean => {
        return this._connectedPool.has(auth);
    }

    public disconnect = ({auth}) => {
        this._connectedPool.delete(auth);

        return "utilisateur déconnecté";
    }

    // @internal
    public addToHistory = ({uid, element}) => {
        let index = this._userData.findIndex(u => u.uid == uid);
        this._userData[index].history.push(element);
        this._saveUserData();
    }

    public getHistory = ({auth}) => {
        auth = auth as IAuthData;
        if (this.isConnected(auth)) {
            return this._userData.find(u => u.uid == auth.uid).history;
        }
    }

    public getUser = ({auth}) => {
        auth = auth as IAuthData;
        if (this.isConnected(auth)) {
            return this._userData.find(u => u.uid == auth.uid);
        }
    }

    public getNotation = ({target_uid}) => {
        target_uid = target_uid as string;

        return this._userData.find(u => u.uid == target_uid).notation;
    }

    public getNickname = ({uid}) => {
        uid = uid as string;
        return this._userData.find(u => u.uid == uid).nickname;
    }

    public createUser = ({nickname, email, password}) => {
        nickname = nickname as string;
        email = email as string;
        password = password as string;
        //TODO: créer utilisateur.
    }

    private _saveUserData = () => {
        if (this._modificationCounter < this._modificationThreshold){
            this._modificationCounter++;
        }
        else {
            let userDataString = JSON.stringify(this._userData, null, 4);
            fs.writeFileSync("JSON/user.json", userDataString, {encoding: "utf-8", flag: "w"});
            console.log("--- Saved users");
            this._modificationCounter = 0;
        }
    }

}