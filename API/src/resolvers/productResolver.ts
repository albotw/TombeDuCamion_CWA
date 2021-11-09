let products = require("../../JSON/products.json");

let toUnicode = (toConvert: string) =>
{
    return toConvert.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

let productResolver = {
    Query:
    {
        products: () =>
        {
            return products;
        },
        productsSearch: (param: any) =>
        {

            param = toUnicode(param.searchString);
            console.log("SEARCH product with arg %o", param);

            let output = products.filter(product =>
            {
                let titleAsUnicode = toUnicode(product.title);
                let descriptionAsUnicode = toUnicode(product.description);
                if (titleAsUnicode.includes(param) || descriptionAsUnicode.includes(param))
                    return product;
            }
            );

            return output;
        },
        product: (args: any) =>
        {
            let p_uid = args.p_uid;
            console.log("GET product with p_uid %o", p_uid);
            return products.find(product => product.p_uid == p_uid);
        },
        bestSellers: () =>
        {
            //TODO: demander à justin une méthode efficace.
            let bestsellers = [];
            for (let i = 0; i < 6; i++)
            {
                bestsellers.push(products[i]);
            }

            return bestsellers;
        }
    }
}

export default productResolver;