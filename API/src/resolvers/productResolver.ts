let products = require("../../JSON/products.json");
let bests = require("../../JSON/bests.json");

let toUnicode = (toConvert: string) =>
{
    return toConvert.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const e = {
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
        
        let bestsellers = [];           // mieux que filter car l'ordre est important
        for (let i = 0; i < 6; i++)
        {
            bestsellers.push(products.find(product => product.p_uid == bests["sells"][i]));
        }
        return bestsellers;
        
    },
    bestRated: () =>
    {
        let bestrated = [];           // mieux que filter car l'ordre est important
        for (let i = 0; i < 6; i++)
        {
            bestrated.push(products.find(product => product.p_uid == bests["rating"][i]));
        }
        return bestrated;
    },
    bestViews: () =>
    {
        let bestviews = [];           // mieux que filter car l'ordre est important
        for (let i = 0; i < 6; i++)
        {
            bestviews.push(products.find(product => product.p_uid == bests["views"][i]));
        }
        return bestviews;
    }
}

export default e;