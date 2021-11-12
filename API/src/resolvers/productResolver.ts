import { performance } from "perf_hooks";

let products = require("../../JSON/products.json");

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

        let output = products.filter(product =>
        {
            let titleAsUnicode = toUnicode(product.title);
            let descriptionAsUnicode = toUnicode(product.description);
            if (titleAsUnicode.includes(searchString) || descriptionAsUnicode.includes(searchString))
                return product;
        }
        );

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
};