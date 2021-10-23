import Ajv, { JSONSchemaType } from "ajv";
import auth_schema from "./assets/JSON_SCHEMA/auth_schema.json";
import comments_schema from "./assets/JSON_SCHEMA/comments_schema.json";
import product_schema from "./assets/JSON_SCHEMA/product_schema.json";
import userdata_schema from "./assets/JSON_SCHEMA/userdata_schema.json";
export class JSONcache
{
	private static _instance: JSONcache;
	private _ajv: Ajv;

	private _validateAuth;
	private _validateComments;
	private _validateProducts;
	private _validateUserdata;

	private constructor()
	{
		this._ajv = new Ajv();
		this._validateAuth = this._ajv.compileAsync(auth_schema);
		this._validateComments = this._ajv.compileAsync(comments_schema);
		this._validateProducts = this._ajv.compileAsync(product_schema);
		this._validateUserdata = this._ajv.compileAsync(userdata_schema);
	}

	public static instance(): JSONcache
	{
		if (JSONcache.instance == null)
		{
			JSONcache._instance = new JSONcache();
		}

		return JSONcache._instance;
	}
}

export enum JSONdata
{
	auth = "auth",
	products = "products",
}
