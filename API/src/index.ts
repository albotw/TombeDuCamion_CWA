import express from "express";
import { IProduct } from "./interfaces/IProduct";
import product_schema from "./schema/product_schema.json";
import cors from "cors";
import { buildSchema, GraphQLSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { createHash } from "crypto";
import { readFileSync } from "fs";
import productResolver from "./resolvers/productResolver";

console.log("CWD: " + process.cwd());
let app = express();

let toUnicode = (toConvert: string) =>
{
    return toConvert.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

//paramétrage CORS
let corsOptions = {
    origin: "*",
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin"],
};
app.use(cors(corsOptions));

//active l'écoute du serveur pour la réception des appels.
const PORT = process.env.PORT || 9090;
app.listen(PORT, () =>
{
    console.log("Serveur à l'écoute sur le port:" + PORT);
});

//fonction hash
let hash = createHash("sha256");


//chargement des données
let products = require("../JSON/products.json");
let bests = require("../JSON/bests.json");

//chargement des produits
let users = require("../JSON/users.json");
let comments = require("../JSON/comments.json");
let auth = require("../JSON/auth.json");

//graphql
//obligé de mettre dist/ car le CWD est /API (Heroku ou local)
let prodSchema_string = readFileSync(`dist/product.graphql`, { encoding: "utf-8" });
let prodSchema = buildSchema(prodSchema_string);
let root = {
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
app.use("/graphql", graphqlHTTP({
    schema: prodSchema,
    rootValue: root,
    graphiql: true
}));

//REST
/*
app.use(express.json());
app.get("/", (req, res) =>
{
    res.status(200);
    res.json({ "message": "Hello, World !" });
})

app.get("/products", (req, res) =>
{
    res.status(200);
    res.json(products);
})

app.get("/products/:id", (req, res) =>
{
    res.status(200);
    res.json(products[req.params.id]);
})

app.get("/products/:title", (req, res) =>
{
    res.status(200);
    res.json(products.filter((data) => { data.title[0] === req.params.title[0] }));
})
*/


