export default class Cache
{
	public static get(id: data, isJson: boolean): any
	{
		let data = localStorage.getItem(id);
		isJson ? data = JSON.parse(data) : null;

		return data;
	}

	public static set(id: data, isJson: boolean, data: any): void
	{
		isJson ? data = JSON.stringify(data) : null;
		localStorage.setItem(id, data);
	}

	public static purge(): void
	{
		localStorage.clear();
	}

	public static delete(id: data): void
	{
		localStorage.removeItem(id);
	}
}

export enum data
{
	//TODO: ajouter type d'informations à stocker dans le cache ici
	Panier = "panier",
}
