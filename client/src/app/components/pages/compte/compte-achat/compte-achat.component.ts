import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import DataController from '../../../../shared/DataController';
import { data } from '../../../../shared/global';
import State, { CacheData } from "../../../../shared/State";

@Component({
  selector: 'app-compte-achat',
  templateUrl: './compte-achat.component.html',
  styleUrls: ['./compte-achat.component.css']
})

export class CompteAchatComponent implements OnInit {
	auth = State.get(CacheData.Auth);
	products = [];
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
			this.history = data.filter((data) => data.type == "BUY").map((data) => 
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