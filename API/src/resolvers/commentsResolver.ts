import fs from "fs";
import IComment from "../interfaces/Comment";
import IProduct from "../interfaces/Product";
import productResolver from "./productResolver";

export default class commentsResolver {
    public static instance: commentsResolver;

    private commentsData : IComment[] = require("../../JSON/comments.json");
    private modificationThreshold: number = 10;
    private modificationCounter : number = 10;

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
}
