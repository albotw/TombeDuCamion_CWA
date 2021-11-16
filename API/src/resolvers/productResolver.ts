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
    fs.writeFileSync("JSON/products_v2.json", productString, { encoding: "utf-8", flag: "w" });
    console.log("--- Saved products ---");
}
export default {
    getAllProducts: () =>
    {
        return products;
    },

    searchProduct: ({ searchString }) =>
    {
        console.log("searchString: " + searchString);
        searchString = toUnicode(searchString);


        let output = [];
        
        for (var key in products){
            if (products.hasOwnProperty(key)){
                
                let product = products[key];
    
                let titleAsUnicode = toUnicode(product.title);
                let descriptionAsUnicode = toUnicode(product.description);
                if (titleAsUnicode.includes(searchString) || descriptionAsUnicode.includes(searchString)){
                    output.push(product);
                }
            }
        }
        return output;
    },

    getProduct: ({ p_uid }) =>
    {
        return products[p_uid];
    },

    top: ({ categorie, champ }) =>
    {

        let topProducts = [];
        champ = 'best_'+champ;
        
        for (var p_uid in infos[champ]){
            topProducts.push(products[infos[champ][p_uid]]);
        }
        return topProducts;
    },

    createProduct: ({ seller, title, stock, description, category, price }) =>
    {
        console.log("create");
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

        console.log(product);
        products.unshift(product);

        saveProducts();
    }
};