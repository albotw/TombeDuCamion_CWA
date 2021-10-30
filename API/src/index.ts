import Ajv from "ajv";
import express from "express";
import { IProduct } from "./IProduct";
import product_schema from "./schema/product_schema.json";
import { graphqlHTTP } from "express-graphql";
import { buildSchema, graphql } from "graphql"

import { query } from "./query";

let qlschema = buildSchema(query);

let app = express();
let ajv = new Ajv();

app.use("/graphql",
    graphqlHTTP({
        schema: gQLSchema,
        graphiql: true
    }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
{
    console.log("Serveur à l'écoute sur " + PORT);
});