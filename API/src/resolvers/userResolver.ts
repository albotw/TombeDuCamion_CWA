import * as fs from "fs";
import IUser from "../interfaces/User";

export default class userResolver {
    public static instance: userResolver;
    private ALIVE_DURATION =  3600000; // 1 heure de connection max
    private CHECK_DELAY = 30000; // vérification toutes les 30 sec.

    private userData : IUser[] = require("../../JSON/users.json");
    private modificationThreshold: number = 10;
    private modificationCounter: number = 0;

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

    private _purge = () => {
        let threshold = new Date();
        this._connectedPool.forEach((disconnectTime, user) => {
            if (disconnectTime > threshold) {
                this._connectedPool.delete(user);
            }
        });
    }

    public connect = ({pseudo, hash}) => {
        pseudo = pseudo as String;
        hash = hash as String;

        let user = this.userData.find(u => u.pseudo == pseudo && u.hash == hash);

        let disconnectTime = new Date(Date.now() + this.ALIVE_DURATION);
        this._connectedPool.set(user.uid, disconnectTime);

        return user;
    }

    public isConnected = ({user}) : boolean => {
        user = user as String;
        return this._connectedPool.has(user);
}

    public disconnect = (user: String) => {
        this._connectedPool.delete(user);
    }

    private _saveUserData = () => {
        if (this.modificationCounter < this.modificationThreshold){
            this.modificationCounter++;
        }
        else {
            let userDataString = JSON.stringify(this.userData, null, 4);
            fs.writeFileSync("JSON/user.json", userDataString, {encoding: "utf-8", flag: "w"});
            console.log("--- Saved users");
            this.modificationCounter = 0;
        }
    }

}