import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { request, gql } from "graphql-request";
export default class DataController
{
	//TODO: typage fort par template => <T> à voir si utilité ?
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

	public static getProduct = async (id: string, callback: (data: any) => void) =>
	{
		let query = gql`
			query getProduct($id: String!) {
				product(p_uid: $id) {
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

		DataController.grab(query, variables).then(callback);
	}

	public static searchProduct = async (arg: string, callback: (data: any) => void) =>
	{
		let query = gql`
		query searchProducts($text: String!) {
			productsSearch(searchString: $text) {
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
		DataController.grab(query, variables).then(callback);
	}

	public static grab = async (query: any, variables: any | null) =>
	{
		return request(environment.API + "/graphql", query, variables);
	}
}
