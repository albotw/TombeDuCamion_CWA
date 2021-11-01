import express from "express";
import { IProduct } from "./interfaces/IProduct";
import product_schema from "./schema/product_schema.json";
import cors from "cors";

let app = express();

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

const PORT = process.env.PORT || 9090;
app.listen(PORT, () =>
{
    console.log("Serveur à l'écoute sur " + PORT);
});



app.use(express.json());
const products = require("../JSON/products.json");

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
    res.json(products.filter( (data) => {data.title[0] === req.params.title[0] } ));
})



