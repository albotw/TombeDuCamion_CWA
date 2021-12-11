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
	totalCount = 0;

	constructor(private route: ActivatedRoute, private router: Router)
	{
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	ngOnInit(): void
	{
		console.log(this.rech);
		this.refreshProducts(0, 16);
	}

	public refreshProducts(pageIndex: number, pageSize: number)
	{

		this.rech = this.route.snapshot.paramMap.get('str');

		let offset = pageIndex * pageSize;

		DataController.searchProduct(this.rech, pageSize, offset, (data) =>
		{
			this.totalCount = data.meta.totalCount;
			this.products = data.results.map(product =>
			{
				if (product['description'].length > 40)
				{
					product['description'] = product['description'].substring(0, 37) + "...";
				}

				return product;
			})
		});
	}

	public getServerData(event?: PageEvent)
	{
		this.refreshProducts(event.pageIndex, event.pageSize);
	}

}
