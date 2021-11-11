import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { HttpClient } from '@angular/common/http';
import { flattenAndSortAnimations } from '@cds/core/internal';
import { environment } from 'src/environments/environment.prod';//.prod';
import { AssertNotNull } from '@angular/compiler';
import DataController from '../shared/DataController';


@Component({
	selector: 'app-accueil',
	templateUrl: './accueil.component.html',
	styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit
{

	id = 0;

	meilleurs: {[key: string]: any} = {
		"Meilleurs Ventes": [], 
		"Plus Vus": [], 
		"Mieux Notés": []
	};

	startIndex: {[key: string]: number} = {
		"Meilleurs Ventes": 0, 
		"Plus Vus": 0, 
		"Mieux Notés": 0
	};

	constructor(private http: HttpClient)
	{
		DataController.bestSellers((data) =>
		{
			data = data.bestSellers;
			data = data.map((product) =>
			{
				if (product.description.length > 40)
					product.description = product.description.substring(0, 37) + "...";
				return product;
			});
			this.meilleurs["Meilleurs Ventes"] = data;
		})
		DataController.bestRated((data) =>
		{
			data = data.bestRated;
			data = data.map((product) =>
			{
				if (product.description.length > 40)
					product.description = product.description.substring(0, 37) + "...";
				return product;
			});
			this.meilleurs["Mieux Notés"] = data;
		})
		DataController.bestViews((data) =>
		{
			data = data.bestViews;
			data = data.map((product) =>
			{
				if (product.description.length > 40)
					product.description = product.description.substring(0, 37) + "...";
				return product;
			});
			this.meilleurs["Plus Vus"] = data;
		})
	}


	addIndex(idx): void
	{
		if (this.startIndex[idx] + 4 < this.meilleurs[idx].length)
		{
			this.startIndex[idx] += 1;
		}
	}

	subIndex(idx): void
	{
		if (this.startIndex[idx] > 0)
		{
			this.startIndex[idx] -= 1;
		}
	}

	getVentes(idx)
	{
		let res = [];

		for (let i = 0; i < 4; i++)
		{
			res.push(this.meilleurs[idx][this.startIndex[idx] + i]);
		}
		return res;
	}

	ngOnInit(): void
	{
	}

}
