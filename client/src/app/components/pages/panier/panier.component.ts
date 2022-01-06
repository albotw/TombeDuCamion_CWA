import { Component, OnInit } from '@angular/core';
import State, { CacheData } from '../../../shared/State';
import DataController from '../../../shared/DataController';

@Component({
	selector: 'app-panier',
	templateUrl: './panier.component.html',
	styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit
{

	panier: any;

	constructor() { }

	ngOnInit(): void
	{
		this.panier = State.get(CacheData.Panier);
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

}
