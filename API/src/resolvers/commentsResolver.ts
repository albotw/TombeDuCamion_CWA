import fs from "fs";
import IComment from "../interfaces/Comment";
import IProduct from "../interfaces/Product";
import productResolver from "./productResolver";
import userResolver from "./userResolver";
import dayjs from "dayjs";
import crypto from "crypto";
import IAuthData from "../interfaces/AuthData";

export default class commentsResolver {
    public static instance: commentsResolver;

    private commentsData : IComment[] = require("../../JSON/comments.json");
    private modificationThreshold: number = 10;
    private modificationCounter : number = 0;

    public static create() {
        if (commentsResolver.instance == null) {
            commentsResolver.instance = new commentsResolver();
        }

        return commentsResolver;
    }

    public getComment = ({c_uid}) => {
        c_uid = c_uid as String;
        return this.commentsData.find(c => c.c_uid == c_uid);
    }

    public getCommentsOfProduct = ({p_uid}) => {
        let product: IProduct = productResolver.instance.getProduct({p_uid});

        return product.comments.map(c_uid => {
                return this.commentsData.find(c => c.c_uid == c_uid);
            }
        );
    }

    public createComment = ({auth, p_uid, message, note}) => {
        auth = auth as IAuthData;
        p_uid = p_uid as string;
        message = message as string;
        note = note as number;
        if (userResolver.instance.isConnected(auth)) {
            if ( userResolver.instance.hasBoughtProduct(auth.uid, p_uid) && false) {
                let c_uid = crypto.createHash("sha256").update(message + note + dayjs().format);
                let comment: IComment = {
                    author: auth.uid,
                    c_uid: c_uid.digest("hex"),
                    date: dayjs().format("DD/MM/YYYY"),
                    message: message,
                    note: note
                }

                this.commentsData.push(comment);
                productResolver.instance.linkComment({auth, p_uid, c_uid});
                this._saveComments();
            }
            else throw new Error("Produit non acheté");
        }
        else throw new Error("Connexion invalide");
    }

    public updateComment = ({auth, c_uid, message, note}) => {
        auth = auth as IAuthData;
        c_uid = c_uid as string;
        message = message as string;
        note = note as number;

        if (userResolver.instance.isConnected(auth)) {
            let index = this.commentsData.findIndex(c => c.c_uid == c_uid && c.author == auth.p_uid);
            this.commentsData[index].message = message;
            this.commentsData[index].note = note;

            this._saveComments();

            return "Comment updated";
        }
        else throw new Error("Connexion invalide");
    }

    public deleteComment = ({auth, p_uid, c_uid}) => {
        auth = auth as IAuthData;
        p_uid = p_uid as string;
        c_uid = c_uid as string;

        if (userResolver.instance.isConnected(auth)) {
            let index = this.commentsData.findIndex(c => c.c_uid == c_uid && c.author == auth.uid);
            delete this.commentsData[index];

            productResolver.instance.unlinkComment({auth, p_uid: p_uid, c_uid: c_uid});

            this._saveComments();

            return "Comment deleted";
        }
        else throw new Error("Connexion invalide");
    }

    private _saveComments = () => {
        if (this.modificationCounter < this.modificationThreshold) {
            this.modificationCounter++;
        }
        else {
            let commentsString = JSON.stringify(this.commentsData, null, 4);
            fs.writeFileSync("JSON/comments.json", commentsString, {encoding: "utf-8", flag: "w"});
            console.log("--- Saved comments ---");
            this.modificationCounter = 0;
        }
    }
}
