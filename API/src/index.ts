import Ajv from "ajv";
import express from "express";
import { IProduct } from "./IProduct";
import product_schema from "./schema/product_schema.json";

let app = express();
let ajv = new Ajv();

app.use(express.json());
app.listen(8080, () =>
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
app.get("/products", (req, res) =>
{
    res.status(200);
    res.json(products);
})