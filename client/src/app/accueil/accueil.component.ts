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

	meilleuresVentes = [];

	startIndex: number[] = [0, 0, 0];

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
			this.meilleuresVentes = data;

		})
	}


	addIndex(idx): void
	{
		if (this.startIndex[idx] + 4 < this.meilleuresVentes.length)
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
			res.push(this.meilleuresVentes[this.startIndex[idx] + i]);
		}
		return res;
	}

	ngOnInit(): void
	{
	}

}
