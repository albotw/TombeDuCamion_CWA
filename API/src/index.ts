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

//chargement des produits
const products = require("../JSON/products.json");

//graphql
//obligé de mettre dist/ car le CWD est /API
let prodSchema_string = readFileSync(`dist/product.graphql`, { encoding: "utf-8" });
let prodSchema = buildSchema(prodSchema_string);
let root = {
    products: () =>
    {
        return products;
    },
    productsSearch: (param) =>
    {
        return products.filter(data => data.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", "").includes(param.searchString.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", "")))
            .concat(products.filter(data => data.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", "").includes(param.searchString.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", ""))));
    },
    product: (param) =>
    {
        return products.find(data => parseInt(data.p_uid) == parseInt(param.p_uid));
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



//test hashage
let hash = createHash("sha256");
hash.update("test");
let hashResult = hash.digest().toString("hex");
console.log("test => " + hashResult);
