import { Component, OnInit } from '@angular/core';
import State, { CacheData } from '../../../shared/State';
import DataController from '../../../shared/DataController';
import { PanierService } from 'src/app/services/panier.service';

@Component({
	selector: 'app-panier',
	templateUrl: './panier.component.html',
	styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
	TabProducts = [];
	ProductTotalValeur;
	products;

	constructor(public panier: PanierService) {
		this.TabProducts = this.panier.getProductFromTab();
		this.products = this.panier.getProductCount();
	}


	/*public trackItem (index: number, item: Item) {
		return item.trackId;
	  }*/

	ngOnInit(): void {

	}

	ControlRemoveProduct(product): void {
		this.panier.RemoveFromTab(product);
		this.TabProducts = this.panier.getProductFromTab();
		this.ProductTotalValeur = this.panier.getTotalPanier();
	}

	ControlIncrement (product) : void  {
		this.panier.addProductsToTab(product);
		this.TabProducts = this.panier.getProductFromTab();
		this.ProductTotalValeur = this.panier.getTotalPanier();
	}

	ControlDecrement(product): void {
		this.panier.MoinsFromTab(product);
		this.TabProducts = this.panier.getProductFromTab();
		this.ProductTotalValeur = this.panier.getTotalPanier();

	}

	acheter() : void {

	}























	/*panier: any;

	constructor() { }*/

	/*ngOnInit(): void
	{
		this.panier = Cache.get(CacheData.Panier);
	}

	addItem(index: number): void
	{
		this.panier[index].count += 1;
	}

	subItem(index: number): void
	{
		this.panier[index].count -= 1;
		if (this.panier[index].count == 0)
		{
			this.panier.splice(index, 1);
			State.set(CacheData.Panier, this.panier);
		}
	}

	delItem(index: number): void
	{
		this.panier.splice(index, 1);
		State.set(CacheData.Panier, this.panier);
	}

	acheter(): void
	{
		//TODO fonction acheter qui enlève du stock le nombre de produit acheter
	}
*/
}
