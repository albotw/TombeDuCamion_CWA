import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
	results = [];
	maxItems = 0;

	constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router)
	{
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	ngOnInit(): void
	{
		this.results  = [];
		DataController.searchProduct(this.rech, (data) =>
		{
			for (let item of data)
			{
				if (item['description'].length > 40)
				{
					item['description'] = item['description'].substring(0, 37) + "...";
				}
				this.results.push(item);
			}
			this.refreshProducts(0, 12);
		});
	}

	public refreshProducts(pageIndex: number, pageSize: number){

		this.maxItems = pageSize;
		this.rech = this.route.snapshot.paramMap.get('str');
		console.log(this.rech);

		this.products = [];
		
		for (let i=pageIndex*this.maxItems; i<(pageIndex + 1)*this.maxItems; i++){
			if (i < this.results.length){
				this.products.push(this.results[i]);
			}
		}
	}

	public getServerData(event?:PageEvent){
		this.refreshProducts(event.pageIndex, event.pageSize);
	}

}
