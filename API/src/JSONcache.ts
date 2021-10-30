import Ajv, { JSONSchemaType } from "ajv";
import auth_schema from "./schema/auth_schema.json";
import comments_schema from "./schema/comments_schema.json";
import product_schema from "./schema/product_schema.json";
import user_schema from "./schema/user_schema.json";
import { IAuth } from "./interfaces/IAuth";
import { IComment } from "./interfaces/IComment";
import { IProduct } from "./interfaces/IProduct";
import { IUser } from "./interfaces/IUser";
import { JSONdata } from "./JSONdata";

import fs from "fs";

export class JSONcache
{
	private static _instance: JSONcache;
	private _ajv: Ajv;

	private _validateAuth;
	private _validateComments;
	private _validateProducts;
	private _validateUserdata;

	private _auth: IAuth[];
	private _commennts: IComment[];
	private _products: IProduct[];
	private _users: IUser[];

	private constructor()
	{
		this._ajv = new Ajv();

		this._validateAuth = this._ajv.compileAsync<IAuth>(auth_schema);
		this._validateComments = this._ajv.compileAsync<IComment>(comments_schema);
		this._validateProducts = this._ajv.compileAsync<IProduct>(product_schema);
		this._validateUserdata = this._ajv.compileAsync<IUser>(user_schema);

		this._loadData();
	}

	private _loadData()
	{
		fs.readFile("./../assets/JSON/auth.json", "utf-8", (err, data) =>
		{
			if (err)
			{
				console.log(err);
				return;
			}
			console.log(data);
			this._auth = JSON.parse(data);
		}
		);
	}

	public static instance(): JSONcache
	{
		if (JSONcache.instance == null)
		{
			JSONcache._instance = new JSONcache();
		}

		return JSONcache._instance;
	}

	public create(dataType: JSONdata): void
	{

	}

	public read(dataType: JSONdata): any
	{

	}

	public update(dataType: JSONdata): any
	{

	}

	public delete(dataType: JSONdata): any
	{

	}
}
