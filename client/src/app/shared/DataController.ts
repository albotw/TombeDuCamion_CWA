import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { request, gql } from "graphql-request";
import sha256 from "crypto-js/sha256";
import * as CryptoJS from "crypto-js/core";

interface FilterData{
	minPrice: number
	maxPrice: number
	minNotation: number,
	maxNotation: number
}

export default class DataController
{
	public static connect = (nickname: string, password: string) => {
		let query = gql`
			query connect($nickname: String!, $hash: String!) {
				connect(nickname: $nickname, hash: $hash) {
					uid
					token
				}
			}
		`;

		let variables = {
			nickname: nickname,
			hash: sha256(password).toString(CryptoJS.enc.Hex)
		};

		return DataController.grab(query, variables);
	}

	public static getUser = (auth: any) =>	{
		let query = gql`
			query getUser($auth: AuthInfo!) {
				getUser(auth: $auth) {
					uid
					nickname
					email
					totalSales
					notation
				}
			}
			`
		let variables = {
			auth: auth
		}
		return DataController.grab(query, variables);
	}

	public static createUser = (nickname: string, email: string, password: string) => {
		let query = gql`
			mutation createUser($nickname: String!, $email: String!, $password: String!) {
				createUser(nickname: $nickname, email: $email, password: $password)
			}
		`;

		let variables = {
			nickname: nickname,
			email: email,
			password: sha256(password).toString(CryptoJS.enc.Hex)
		}

		return DataController.grab(query, variables);
	}
	// * fonction pour tester si l'API fonctionne, a supprimer
	public static testApi = async (callback: (data: any) => void) =>
	{
		let query = gql`
		{
		}`

		DataController.grab(query, null).then(callback);
	}

	public static postComment = async (auth, p_uid: string, message: string, note: number, callback: (data: any) => void) =>
	{
		let query = gql`
			mutation createComment($auth: AuthInfo!, $p_uid: ID!, $message: String!, $note: Float!) {
				createComment(auth: $auth, p_uid: $p_uid, message: $message, note: $note)
			}
		`

		let variables = {
			auth: auth,
			p_uid: p_uid,
			message: message,
			note: note,
		}
		DataController.grab(query, variables).then(result => result.createComment).then(callback);
	}

	public static addWishList = async (auth, product: string, callback: (data: any) => void) =>
	{
		let query = gql`
				mutation addToWishlist($auth: AuthInfo!, $product: ID!) {
					addToWishlist(auth: $auth, product: $product)
				}
		`

		let variables = {
			auth: auth,
			product: product,
		}
		DataController.grab(query, variables).then(result => result.addToWishlist).then(callback);
	}


	public static postProduct = async (auth, seller: string, title: string, stock: number, description: string, category: string, price: number, callback: (data: any) => void) =>
	{
		let query = gql`
			mutation createProduct($auth: AuthInfo!, $seller: String!, $title: String!, $stock: Int!, $description: String!, $category: String!, $price: Float!){
				createProduct(auth: $auth, seller: $seller, title: $title, stock: $stock, description: $description, category: $category, price: $price)
			}
		`

		let variables = {
			auth: auth,
			seller: seller,
			title: title,
			stock: stock,
			description: description,
			category: category,
			price: price
		}
		DataController.grab(query, variables).then(result => result.createProduct).then(callback);
	}

	public static addImageToProduct = async(auth, p_uid: string, image: string, callback: (data: any) => void) =>
	{
		let query = gql`
			mutation addImageToProduct($auth: AuthInfo!,	$p_uid: ID!,	$image: String!){
				addImageToProduct(auth: $auth,p_uid: $p_uid, image: $image)
			}
		`

		let variables = {
			auth: auth,
			p_uid: p_uid,
			image: image
		}
		DataController.grab(query, variables).then(result => result.addImageToProduct).then(callback);
	}


	/**
	 * fonction pour récupérer les meilleurs éléments dans leur domaine.
	 * @param categorie catégorie du produit: Global si pas de catégorie précise
	 * @param champ champ sur lequel trier: notation, sales, views
	 * @param callback fonction de retour qui traitera les produits
	 */
	public static top = async (categorie: string, champ: string, callback: (data: any) => void) =>
	{
		let query = gql`
			query top($categorie: String!, $champ: String!) {
				top(categorie: $categorie, champ: $champ) {
					p_uid
					seller
					title
					price
					stock
					description
					images
					comments
					sales
					notation
				}
			}
		`

		let variables = {
			categorie: categorie,
			champ: champ
		}

		DataController.grab(query, variables).then(result => result.top).then(callback);
	}

	public static getCommentsOfProduct = async (p_uid: string, callback: (data: any) => void) =>
	{
		let query = gql`
			query getCommentsOfProduct($p_uid: String!) {
				getCommentsOfProduct(p_uid: $p_uid) {
				c_uid
				author
				date
				message
				note
				}
			}
		`;

		let variables = {
			p_uid: p_uid
		}

		DataController.grab(query, variables).then(result => result.getCommentsOfProduct).then(callback);
	}

	public static getWishList = async (auth, callback: (data: any) => void) =>
	{
		let query = gql`
			query getWishlist($auth: AuthInfo) {
				getWishlist(auth: $auth)
			}
		`;

		let variables = {
			auth: auth
		}

		DataController.grab(query, variables).then(result => result.getWishlist).then(callback);
	}

	/**
	 * fonction pour récupérer un produit.
	 * @param id identifiant unique du produit
	 */
	public static getProduct = async (id: string, callback: (data: any) => void) =>
	{
		let query = gql`
			query getProduct($id: ID!) {
				getProduct(p_uid: $id) {
					p_uid
					seller
					title
					price
					stock
					description
					images
					notation
					comments
					sales
				}
			}
		`;

		let variables = {
			id: id
		}

		DataController.grab(query, variables).then(result => result.getProduct).then(callback);
	}


	/**
	 * fonction pour rechercher un produit avec pagination intégrée.
	 * @param arg texte de la recherche.
	 * @param limit nombre de résultats à récupérer
	 * @param offset décalage des résultats
	 */
	public static searchProduct = async (arg: string, cat: string, limit: number, offset: number, sort: String, filter: FilterData, callback: (data: any) => void) =>
	{
		let query = gql`
		query searchProducts($text: String!, $cat: String!, $offset: Int!, $limit: Int!, $sort: SortType!, $filter: FilterData!) {
			searchProduct(searchString: $text, cat: $cat, offset: $offset, limit: $limit, sort: $sort, filter: $filter) {
				meta {
					totalCount
					totalPages
				}
				results {
					p_uid
					title
					description
					images
					category
					notation
					price
					sales
				}
			}
		}
		`
		let variables = {
			text: arg,
			cat: cat,
			offset: offset,
			limit: limit,
			sort: sort,
			filter: filter
		};
		DataController.grab(query, variables).then(result => result.searchProduct).then(callback);
	}

	/**
	 * fonction pour la récupération de l'historique.
	 * @param arg texte de la recherche.
	 * @param limit nombre de résultats à récupérer
	 * @param offset décalage des résultats
	 */
	 public static getHistory = async (auth, callback: (data: any) => void) =>
	 {
		let query = gql`
		query getHistory($auth: AuthInfo!) {
			getHistory(auth: $auth) {
				type,
				product
			}
		}
		`

		let variables = {
			auth: auth
		}

		DataController.grab(query, variables).then(result => result.getHistory).then(callback);
	 }

	 public static getNickname = async (uid, callback: (data: any) => void) =>
	 {
		let query = gql`
			query getNickname($uid: String!) {
				getNickname(uid: $uid)
			}
		`

		let variables = {
			uid: uid
		}

		DataController.grab(query, variables).then(result => result.getNickname).then(callback);
	 }


	public static grab = async (query: any, variables: any | null) =>
	{
		return request(environment.API + "/graphql", query, variables, { "Content-Type": "application/json" });
	}


}
