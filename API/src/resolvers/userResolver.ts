import * as fs from "fs";
import IUser from "../interfaces/User";

export default class userResolver {
    public static instance: userResolver;
    private ALIVE_DURATION =  3600000; // 1 heure de connection max
    private CHECK_DELAY = 30000; // vérification toutes les 30 sec.

    private _userData : IUser[] = require("../../JSON/users.json");
    private _modificationThreshold: number = 10;
    private _modificationCounter: number = 0;

    private _connectedPool: Map<String, Date>;

    public constructor() {
        this._connectedPool = new Map<String, Date>();

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

        let user = this._userData.find(u => u.nickname == nickname && u.hash == hash);

        let disconnectTime = new Date(Date.now() + this.ALIVE_DURATION);
        this._connectedPool.set(user.uid, disconnectTime);

        return user;
    }

    public isConnected = ({user}) : boolean => {
        user = user as String;
        return this._connectedPool.has(user);
    }

    public disconnect = ({uid}) => {
        this._connectedPool.delete(uid);

        return "utilisateur déconnecté";
    }

    // @internal
    public addToHistory = ({uid, element}) => {
        let index = this._userData.findIndex(u => u.uid == uid);
        this._userData[index].history.push(element);
        this._saveUserData();
    }

    public getHistory = ({uid}) => {
        if (this.isConnected({user: uid})) {
            return this._userData.find(u => u.uid == uid).history;
        }
    }

    public getUser = ({uid}) => {
        uid = uid as string;
        if (this.isConnected({user: uid})) {
            return this._userData.find(u => u.uid == uid);
        }
    }

    public getNotation = ({uid, target_uid}) => {
        uid = uid as string;
        target_uid = target_uid as string;

        if (this.isConnected({user : uid})) {
            return this._userData.find(u => u.uid == target_uid).notation;
        }
    }

    public getNickname = ({uid}) => {
        uid = uid as string;
        return this._userData.find(u => u.uid == uid).nickname;
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