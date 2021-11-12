import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { request, gql } from "graphql-request";
export default class DataController
{
	// * fonction pour tester si l'API fonctionne, a supprimer
	public static testApi = async (callback: (data: any) => void) =>
	{
		console.log(environment.API);
		let query = gql`
		{
			product(p_uid: "000") {
				p_uid
				seller
				title
				stock
				description
				images
				comments
			}
		}`

		DataController.grab(query, null).then(callback);
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
			query top($categorie: String, $champ: String) {
				top(categorie: $categorie, champ: $champ) {
					p_uid
					seller
					title
					price
					stock
					description
					images
					comments
				}
			}
		`

		let variables = {
			categorie: categorie,
			champ: champ
		}

		DataController.grab(query, variables).then(result => result.top	).then(callback);
	}


	/**
	 * fonction pour récupérer un produit.
	 * @param id identifiant unique du produit
	 */
	public static getProduct = async (id: string, callback: (data: any) => void) =>
	{
		let query = gql`
			query getProduct($id: ID) {
				getProduct(p_uid: $id) {
					p_uid
					seller
					title
					price
					stock
					description
					images
					comments
				}
			}
		`;

		let variables = {
			id: id
		}

		DataController.grab(query, variables).then(result => result.getProduct).then(callback);
	}

	/**
	 * fonction pour rechercher un produit.
	 * @param arg texte de la recherche.
	 */
	public static searchProduct = async (arg: string, callback: (data: any) => void) =>
	{
		let query = gql`
		query searchProducts($text: String) {
			searchProduct(searchString: $text) {
				p_uid
				seller
				title
				stock
				description
				images
				comments
			}
		}
		`
		let variables = {
			text: arg
		};
		DataController.grab(query, variables).then(result => result.searchProduct).then(callback);
	}

	public static grab = async (query: any, variables: any | null) =>
	{
		return request(environment.API + "/graphql", query, variables, { "Content-Type": "application/json" });
	}
}
