import { performance } from "perf_hooks";

let products = require("../../JSON/products.json");
let infos = require("../../JSON/infos.json");

let toUnicode = (toConvert: string) =>
{
    return toConvert.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
};