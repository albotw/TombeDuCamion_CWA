import IAuthData from "../interfaces/AuthData";
import userResolver from "./userResolver";
import fs from "fs";

export default class categoryResolver {
    public static instance : categoryResolver;

    private categoryData : string[] = require("../../JSON/categories.json");
    private modificationThreshold : number = 10;
    private modificationCounter : number = 0;

    public static create() {
        if (categoryResolver.instance == null) {
            categoryResolver.instance = new categoryResolver();
        }

        return categoryResolver;
    }

    public getCategories = () => {
        return this.categoryData;
    }

    public pushCategory = ({auth, categorie}) => {
        auth = auth as IAuthData;
        categorie = categorie as string;

        if(userResolver.instance.isConnected(auth)) {
            this.categoryData.unshift(categorie);
            this._saveCategories();
            return "Categorie ajoutée";
        }

        return "Erreur de connexion";
    }

    //@internal
    public isValid = (category : string) => {
        return this.categoryData.includes(category);
    }

    private _saveCategories = () => {
        if (this.modificationCounter < this.modificationThreshold) {
            this.modificationCounter++;
        }
        else {
            let categoriesString = JSON.stringify(this.categoryData, null, 4);
            fs.writeFileSync("JSON/categories.json", categoriesString, {encoding: "utf-8", flag: "w"});
            console.log("--- Saved categories ---");
            this.modificationCounter = 0;
        }
    }
}