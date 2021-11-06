import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';//.prod';
import DataController from '../shared/DataController';

@Component({
	selector: 'app-resultats',
	templateUrl: './resultats.component.html',
	styleUrls: ['./resultats.component.css']
})
export class ResultatsComponent implements OnInit
{

	rech = "";
	products = [];

	constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router)
	{
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	ngOnInit(): void
	{
		this.rech = this.route.snapshot.paramMap.get('str');
		console.log(this.rech);
		this.products = [];

		DataController.searchProduct(this.rech, (data) =>
		{
			console.log(data);
			data = data.productsSearch;
			for (let item of data)
			{
				if (item['description'].length > 40)
				{
					item['description'] = item['description'].substring(0, 37) + "...";
				}
				this.products.push(item);
			}
		})
	}


}
