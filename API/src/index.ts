import express from "express";
import cors from "cors";
import { buildSchema, GraphQLSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { readFileSync } from "fs";
import productResolver from "./resolvers/productResolver";
import userResolver from "./resolvers/userResolver";

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
let mutation_string = readFileSync("dist/schemas/mutation.gql", { encoding: "utf-8" });
let prodSchema_string = readFileSync("dist/schemas/product.gql", { encoding: "utf-8" });
let userSchema_string = readFileSync("dist/schemas/user.gql", { encoding: "utf-8" });
let commentsSchema_string = readFileSync("dist/schemas/comment.gql", {encoding: "utf-8"});

// ? fusion des schémas en un seul
let globalSchema = buildSchema(prodSchema_string + userSchema_string + commentsSchema_string + query_string + mutation_string);


// création resolvers
userResolver.create();


// ? mapping resolvers (mutation & query)
let root = {
    getAllProducts: productResolver.getAllProducts,
    searchProduct: productResolver.searchProduct,
    getProduct: productResolver.getProduct,
    top: productResolver.top,
    connect: userResolver.instance.connect,
    isConnected: userResolver.instance.isConnected,


    processOrder: productResolver.processOrder,
    createProduct: productResolver.createProduct,
}

app.use("/graphql", graphqlHTTP({
    schema: globalSchema,
    rootValue: root,
    graphiql: true
}));

//TODO Ajouter point REST pour l'upload d'images.


