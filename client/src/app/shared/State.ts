export default class State
{
	// ! cache simple avec opérations CRUD
	// * voir si cache simple avec sessionStorage
	// * ou alors faire un cache avancé avec indexedDB pour stocker les produits consultés au lieu de devoir les grab a chaque fois.
	public static get(cacheElement: { id, isJson }): any
	{
		let data = sessionStorage.getItem(cacheElement.id);
		if (cacheElement.isJson)
		{
			let obj = JSON.parse(data);
			obj == undefined ? obj = [] : null;

			return obj;
		}
		return data;
	}

	public static append(cacheElement: { id, isJson }, data: any)
	{
		let item = sessionStorage.getItem(cacheElement.id);
		let array = JSON.parse(item);

		if (array == undefined) array = [];

		array.push(data)
		item = JSON.stringify(data);
		sessionStorage.setItem(cacheElement.id, item);
	}

	public static set(cacheElement: { id, isJson }, data: any): void
	{
		cacheElement.isJson ? data = JSON.stringify(data) : null;
		sessionStorage.setItem(cacheElement.id, data);
	}

	public static purge(): void
	{
		sessionStorage.clear();
	}

	public static delete(cacheElement: { id, isJson }): void
	{
		sessionStorage.removeItem(cacheElement.id);
	}

	public static has(cacheElement: {id, isJson}) : boolean {
		return sessionStorage.getItem(cacheElement.id) != null;
	}
}

export const CacheData = Object.freeze(
	{
		//TODO: ajouter type d'informations à stocker dans le cache ici
		Panier: { id: "panier", isJson: true },
		
		Wishlist: { id: "wishlist", isJson: true },
		Auth: {id: "auth", isJson: true}
	});

