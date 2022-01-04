import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { HttpClient } from '@angular/common/http';
import { flattenAndSortAnimations } from '@cds/core/internal';
import { environment } from 'src/environments/environment.prod';//.prod';
import { AssertNotNull } from '@angular/compiler';
import DataController from '../../../shared/DataController';
import { data } from '../../../shared/global'

@Component({
	selector: 'app-accueil',
	templateUrl: './accueil.component.html',
	styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit
{

	id = 0;
	DATA : any;

	meilleurs: { [key: string]: any } = {
		"Meilleurs Ventes": [],
		"Plus Vus": [],
		"Mieux Notés": []
	};

	startIndex: { [key: string]: number } = {
		"Meilleurs Ventes": 0,
		"Plus Vus": 0,
		"Mieux Notés": 0
	};

	private _hideDescription = (data: any) =>
	{
		return data.map((product) =>
		{
			if (product.description.length > 40)
				product.description = product.description.substring(0, 37) + "...";
			return product;
		});
	}

	constructor(private http: HttpClient)
	{
		this.DATA = data;
		DataController.top("Global", "sales", (data) =>
		{
			console.log(data);
			this.meilleurs["Meilleurs Ventes"] = this._hideDescription(data);
		})
		DataController.top("Global", "notation", (data) =>
		{
			console.log(data);
			this.meilleurs["Mieux Notés"] = this._hideDescription(data);
		})
		DataController.top("Global", "views", (data) =>
		{
			console.log(data);

			this.meilleurs["Plus Vus"] = this._hideDescription(data);
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
