import express from "express";
import cors from "cors";
import { buildSchema, GraphQLSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { readFileSync } from "fs";
import productResolver from "./resolvers/productResolver";
import userResolver from "./resolvers/userResolver";
import commentsResolver from "./resolvers/commentsResolver";
import categoryResolver from "./resolvers/categoryResolver";

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
productResolver.create();
commentsResolver.create();
categoryResolver.create();

// ? mapping resolvers (mutation & query)
let root = {
    getCategories: categoryResolver.instance.getCategories,
    getAllProducts: productResolver.instance.getAllProducts,
    searchProduct: productResolver.instance.searchProduct,
    getProduct: productResolver.instance.getProduct,
    top: productResolver.instance.top,

    connect: userResolver.instance.connect,
    disconnect: userResolver.instance.disconnect,
    isConnected: userResolver.instance.isConnected,
    getUser: userResolver.instance.getUser,
    getNickname: userResolver.instance.getNickname,
    getHistory: userResolver.instance.getHistory,
    getNotation: userResolver.instance.getNotation,
    getWishlist: userResolver.instance.getWishlist,

    getComment: commentsResolver.instance.getComment,
    getCommentsOfProduct: commentsResolver.instance.getCommentsOfProduct,


    pushCategory: categoryResolver.instance.pushCategory,

    processOrder: productResolver.instance.processOrder,
    createProduct: productResolver.instance.createProduct,
    updateProduct: productResolver.instance.updateProduct,
    addImageToProduct: productResolver.instance.addImageToProduct,

    createComment: commentsResolver.instance.createComment,
    updateComment: commentsResolver.instance.updateComment,
    deleteComment: commentsResolver.instance.deleteComment,

    createUser: userResolver.instance.createUser,
    upateUser: userResolver.instance.updateUser,
    addToWishlist: userResolver.instance.addToWishlist,
    removeFromWishlist: userResolver.instance.removeFromWishlist
}

app.use("/graphql", graphqlHTTP({
    schema: globalSchema,
    rootValue: root,
    graphiql: true
}));

//TODO Ajouter point REST pour l'upload d'images.


