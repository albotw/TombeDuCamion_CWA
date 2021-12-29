import crypto from "crypto";
import fs from "fs";
import IProduct from "../interfaces/Product";
import IOrder from "../interfaces/Order";

let products : IProduct[] = require("../../JSON/products.json");

const MODIFICATION_THRESHOLD: number = 10;
let modificationCounter: number = 0;

let toUnicode = (toConvert: string) =>
{
    return toConvert.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

let saveProducts = () =>
{
    if (modificationCounter < MODIFICATION_THRESHOLD)
    {
        modificationCounter++;
    }
    else
    {
        let productString = JSON.stringify(products, null, 4);
        fs.writeFileSync("JSON/products.json", productString, { encoding: "utf-8", flag: "w" });
        console.log("--- Saved products ---");
        modificationCounter = 0;
    }
}

export default {
    getAllProducts: () =>
    {
        return products;
    },

    searchProduct: ({ searchString, limit, offset }) =>
    {
        searchString = toUnicode(searchString);

        let fullResults = products.filter(product =>
        {
            let unicodeTitle = toUnicode(product.title);
            let unicodeDescription = toUnicode(product.description);

            return unicodeTitle.includes(searchString) || unicodeDescription.includes(searchString);
        });

        //TODO: placer les résultats en cache ?
        //HashMap entre clé unique et fullResults. Nettoyé toutes les minutes.

        return {
            "meta": {
                "totalCount": fullResults.length,
                "totalPages": Math.round(fullResults.length / limit),
            },
            "results": fullResults.slice(offset, offset + limit)
        };
    },

    getProduct: ({ p_uid }) =>
    {
        let product = products.find(product => product.p_uid == p_uid);
        product.views += 1;
        saveProducts();
        return product;
    },

    top: ({ categorie, champ }) =>
    {
        let topProducts = products.sort((product1, product2) =>
        {
            switch (champ)
            {
                case "sales":
                    return product2.sales - product1.sales;
                case "notation":
                    return product2.notation - product1.notation;
                case "views":
                    return product2.views - product1.views;
            }
        });

        let filteredTopProducts = topProducts.reduce((output, product) =>
        {
            if (output.length < 6)
            {
                if (categorie != "Global" && product.category == categorie)
                {
                    output.push(product);
                }
                else if (categorie == "Global")
                {
                    output.push(product);
                }
            }
            return output;
        }, []);
        return filteredTopProducts;
    },

    createProduct: ({ seller, title, stock, description, category, price }) =>
    {
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
        products.unshift(product);

        saveProducts();

        return p_uid;
    },

    processOrder: ({orders}) => {
        orders = orders as IOrder[];
        orders.forEach(order => {
            let index = products.findIndex(p => (p.p_uid == order.p_uid));
            if (index != -1 && products[index].stock > 0) {
                products[index].stock--;
                products[index].sales++;

                if (products[index].stock < 0) {
                    //TODO: suppression ?
                }
            }
            else {
                console.error("Achat d'un produit indisponible !!");
            }
        });

        saveProducts();
    }
};