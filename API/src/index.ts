import Ajv from "ajv";
import express from "express";
import { IProduct } from "./IProduct";
import product_schema from "./schema/product_schema.json";

let app = express();
let ajv = new Ajv();

app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
{
    console.log("Serveur à l'écoute sur 8080");
});

//=========================================================
// ! FONCTIONS VALIDATION
// let validateProducts = ajv.compile<IProduct>(product_schema);
//=========================================================
// ! JSON LOAD
const products = require("../JSON/products.json");
//=========================================================
//! FONCTIONS REST
app.get("/", (req, res) =>
{
    res.status(200);
    res.json({});
})

app.get("/products", (req, res) =>
{
    res.status(200);
    res.json(products);
})