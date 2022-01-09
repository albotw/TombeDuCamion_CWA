import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import DataController from '../../../../shared/DataController';
import { data } from '../../../../shared/global';
import State, { CacheData } from "../../../../shared/State";

@Component({
  selector: 'app-compte-vente',
  templateUrl: './compte-vente.component.html',
  styleUrls: ['./compte-vente.component.css']
})
export class CompteVenteComponent implements OnInit {
	auth = State.get(CacheData.Auth);
	products = [];
	actualSort = "NO_SORT";
	history = [] ;
	DATA = data;

	constructor(private route: ActivatedRoute, private router: Router)
	{
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	ngOnInit(): void {
		this.getHistory();
	}

	public getHistory(){
		DataController.getHistory(this.auth, (data) =>
		{
			this.history = data.filter((data) => data.type == "SELL").map((data) => 
			{
				return data.product;
			});

			this.getProducts();
		});
	}

	public getProducts()
	{
		for(const product in this.history)
		{
			DataController.getProduct(this.history[product] ,(data) =>
			{
				this.products.push(data)
			});
		}
	}
}
