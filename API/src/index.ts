import express from "express";
import cors from "cors";
import { buildSchema, GraphQLSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { createHash } from "crypto";
import { readFileSync } from "fs";
import productResolver from "./resolvers/productResolver";
import { performance } from "perf_hooks";

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

// ? active l'écoute du serveur pour la réception des appels.
const PORT = process.env.PORT || 9090;
app.listen(PORT, () =>
{
    console.log("Serveur à l'écoute sur le port:" + PORT);
});

// ? Chargement des schémas graphql
// ! obligé de mettre dist/ car le CWD est /API (Heroku ou local)
let query_string = readFileSync("dist/schemas/query.gql", { encoding: "utf-8" });
let prodSchema_string = readFileSync("dist/schemas/product.gql", { encoding: "utf-8" });
let authSchema_string = readFileSync("dist/schemas/auth.gql", { encoding: "utf-8" });
let userSchema_string = readFileSync("dist/schemas/user.gql", { encoding: "utf-8" });

// ? fusion des schémas en un seul
let globalSchema = buildSchema(prodSchema_string + authSchema_string + userSchema_string + query_string);

// ? mapping resolvers
let root = {
    getAllProducts: productResolver.getAllProducts,
    searchProduct: productResolver.searchProduct,
    getProduct: productResolver.getProduct,
    top: productResolver.top
}

app.use("/graphql", graphqlHTTP({
    schema: globalSchema,
    rootValue: root,
    graphiql: true
}));



