import crypto from "crypto";
import fs from "fs";
import IProduct from "../interfaces/Product";
import IOrder from "../interfaces/Order";
import userResolver from "./userResolver";
import IHistoryElement from "../interfaces/HistoryElement";
import IAuthData from "../interfaces/AuthData";

export default class productResolver {
    public static instance : productResolver;

    private productData : IProduct[] = require("../../JSON/products.json");
    private modificationThreshold : number = 10;
    private modificationCounter : number = 0;

    public static create() {
        if (productResolver.instance == null) {
            productResolver.instance = new productResolver();
        }

        return productResolver.instance;
    }

    private _toUnicode = (toConvert: string) =>
    {
        return toConvert.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    private _saveProducts = () =>
    {
        if (this.modificationCounter < this.modificationThreshold)
        {
            this.modificationCounter++;
        }
        else
        {
            let productString = JSON.stringify(this.productData, null, 4);
            fs.writeFileSync("JSON/products.json", productString, { encoding: "utf-8", flag: "w" });
            console.log("--- Saved products ---");
            this.modificationCounter = 0;
        }
    }

    public getAllProducts = () =>
    {
        return this.productData;
    };

    public searchProduct = ({ searchString, limit, offset, sort }) => {
        searchString = searchString as string;
        limit = limit as number;
        offset = offset as number;
        sort = sort as string;

        searchString = this._toUnicode(searchString);

        let fullResults = this.productData.filter(product => {
            let unicodeTitle = this._toUnicode(product.title);
            let unicodeDescription = this._toUnicode(product.description);

            return unicodeTitle.includes(searchString) || unicodeDescription.includes(searchString);
        });

        fullResults = fullResults.sort((a, b) => {
            switch (sort){
                case "LETTER_ASCENDING":
                    return a.title.localeCompare(b.title);
                case "LETTER_DESCENDING":
                    return a.title.localeCompare(b.title)*(-1);
                case "PRICE_ASCENDING":
                    return a.price - b.price;
                case "PRICE_DESCENDING":
                    return b.price - a.price;
            }
        })

        //TODO: placer les résultats en cache ?
        //HashMap entre clé unique et fullResults. Nettoyé toutes les minutes.

        return {
            "meta": {
                "totalCount": fullResults.length,
                "totalPages": Math.round(fullResults.length / limit),
                },
            "results": fullResults.slice(offset, offset + limit)
        };
    }

    public getProduct= ({ p_uid }) => {
        p_uid = p_uid as string;

        let index = this.productData.findIndex(product => product.p_uid == p_uid);
        this.productData[index].views++;
        this._saveProducts();
        return this.productData[index];
    }

    public top= ({ categorie, champ }) => {
        categorie = categorie as string;
        champ = champ as string;

        let topProducts = this.productData.sort((product1, product2) => {
            switch (champ) {
                case "sales":
                return product2.sales - product1.sales;
                case "notation":
                return product2.notation - product1.notation;
                case "views":
                return product2.views - product1.views;
            }
        });

        let filteredTopProducts = topProducts.reduce((output, product) => {
            if (output.length < 6) {
                if (categorie != "Global" && product.category == categorie) {
                    output.push(product);
                }
                else if (categorie == "Global") {
                    output.push(product);
                }
            }
            return output;
        }, []);
        return filteredTopProducts;
    }

    public createProduct= ({ auth, seller, title, stock, description, category, price }) => {
        auth = auth as IAuthData;
        seller = seller as string;
        title = title as string;
        stock = stock as number;
        description = description as string;
        category = category as string;
        price = price as number;
        if (userResolver.instance.isConnected(auth)){


            //TODO: ajouter import images: placement dans IMG/, hasher nom fichier, ajouter hash dans [images]
            //TODO: vérifier catégorie
            title = title.normalize("NFD");
            description = description.normalize("NFD");

            let p_uid = crypto.createHash("sha256").update(title + seller + description + Date()).digest("hex");
            let product = {
                p_uid: p_uid,
                seller: seller,
                title: title,
                stock: stock,
                description: description,
                images: [],
                category: category,
                comments: [],
                notation: 0.0,
                price: price,
                sales: 0,
                views: 0
            };

            // ? placé au début des produits pour débug facile.
            this.productData.unshift(product);

            this._saveProducts();

            return p_uid;
        }
        return undefined;
    }

    public linkComment = ({auth, p_uid, c_uid}) => {
        auth = auth as IAuthData;
        p_uid = p_uid as string;
        c_uid = c_uid as string;

        if (userResolver.instance.isConnected(auth)){
            this.productData.find(p => p.p_uid, p_uid).comments.push(c_uid);
            this._saveProducts();
        }
    }

    public unlinkComment = ({auth, p_uid, c_uid}) => {
        auth = auth as IAuthData;
        p_uid = p_uid as string;
        c_uid = c_uid as string;

        if(userResolver.instance.isConnected(auth)) {
            let index = this.productData.findIndex(p => p.p_uid == p_uid);
            let c_index = this.productData[index].comments.indexOf(c_uid);

            delete this.productData[index].comments[c_index];

            this._saveProducts();
        }
}

    public updateProduct = ({auth, p_uid, title, stock, description, category, price}) => {
        auth  = auth as IAuthData;
        p_uid = p_uid as string;
        title = title as string;
        stock = stock as number;
        description = description as string;
        category = category as string;
        price = price as number;

        if (userResolver.instance.isConnected(auth)) {
            let index = this.productData.findIndex(p => p.p_uid == p_uid);

            this.productData[index].title = title;
            this.productData[index].stock = stock;
            this.productData[index].description = description;
            this.productData[index].category = category;
            this.productData[index].price = price;

            return "product updated";
        }
        return "login error";
    }

    public processOrder= ({auth, items}) => {
        auth = auth as IAuthData;
        items = items as IOrder[];

        if (userResolver.instance.isConnected(auth)) {
            items.forEach(order => {
                let index = this.productData.findIndex(p => (p.p_uid == order.p_uid));
                if (index != -1 && this.productData[index].stock > 0) {
                    this.productData[index].stock--;
                    this.productData[index].sales++;

                    if (this.productData[index].stock < 0) {
                        //TODO: suppression ?
                    }

                    let buyerHistoryElement : IHistoryElement = {
                        type: "BUY",
                        product: this.productData[index].p_uid
                    }
                    userResolver.instance.addToHistory({uid: auth.uid, element: buyerHistoryElement});

                    let sellerHistoryElement : IHistoryElement = {
                        type: "SELL",
                        product: this.productData[index].p_uid
                    }
                    userResolver.instance.addToHistory({uid: this.productData[index].seller, element: sellerHistoryElement});
                }
                else {
                    console.error("Achat d'un produit indisponible !!");
                }
            });

            this._saveProducts();

            return "order completed";
        }
        return "login error";
    }
}