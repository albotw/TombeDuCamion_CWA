import crypto from "crypto";
import fs from "fs";

let products = require("../../JSON/products.json");
let infos = require("../../JSON/infos.json");

let toUnicode = (toConvert: string) =>
{
    return toConvert.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

let saveProducts = () =>
{
    let productString = JSON.stringify(products, null, 4);
    fs.writeFileSync("JSON/products.json", productString, { encoding: "utf-8", flag: "w" });
    console.log("--- Saved products ---");
}

export default {
    getAllProducts: () =>
    {
        return products;
    },

    searchProduct: ({ searchString, limit, offset }) =>
    {
        searchString = toUnicode(searchString);


        let output = [];

        for (var i = offset; i < limit; i++)
        {

            let product = products[i];

            let titleAsUnicode = toUnicode(product.title);
            let descriptionAsUnicode = toUnicode(product.description);
            if (titleAsUnicode.includes(searchString) || descriptionAsUnicode.includes(searchString))
            {
                output.push(product);
            }
        }
        return output;
    },

    getProduct: ({ p_uid }) =>
    {
        return products.find(product => product.p_uid == p_uid);
    },

    top: ({ categorie, champ }) =>
    {
        let topProducts = products.sort((product1, product2) =>
        {
            switch (champ)
            {
                case "sales":
                    return product2.sells - product1.sells;
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

        let p_uid = crypto.createHash("sha256").update(title + seller + description).digest("hex");
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
    }
};