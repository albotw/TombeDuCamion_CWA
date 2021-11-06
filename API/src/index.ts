import express from "express";
import { IProduct } from "./interfaces/IProduct";
import product_schema from "./schema/product_schema.json";
import cors from "cors";
import { buildSchema, GraphQLSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { createHash } from "crypto";
import { readFileSync } from "fs";
console.log("CWD: " + process.cwd());
let app = express();

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

//fonction unicode
let toUnicode = (toConvert: string) =>
{
    return toConvert.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


//chargement des produits
const products = require("../JSON/products.json");

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
    }

}
app.use("/graphql", graphqlHTTP({
    schema: prodSchema,
    rootValue: root,
    graphiql: true
}));

//REST
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




