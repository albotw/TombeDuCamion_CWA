import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import DataController from '../../../../shared/DataController';
import { data } from '../../../../shared/global'

@Component({
  selector: 'app-compte-achat',
  templateUrl: './compte-achat.component.html',
  styleUrls: ['./compte-achat.component.css']
})

export class CompteAchatComponent implements OnInit {
	products = [];
	totalCount = 0;
	actualSort = "NO_SORT";
	DATA = data;
	pageIndex = 0;
	pageSize = 16;	
	@ViewChild('paginator') paginator: MatPaginator;

	constructor(private route: ActivatedRoute, private router: Router)
	{
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	ngOnInit(): void {
		this.refreshProducts(this.pageIndex, this.pageSize);
		console.log("le produit : ",this.products);
	}

	public refreshProducts(pageIndex: number, pageSize: number)
	{
		
		let offset = pageIndex * pageSize;

		DataController.searchProduct("", "", pageSize, offset, this.DATA.actualSort, this.DATA.filter, (data) =>
		{
			this.totalCount = data.meta.totalCount;
			this.products = data.results.filter((product) => product['price'] > 100.0).map(product =>
			{
				return product;
			})
		});
	}

	public getServerData(event?: PageEvent)
	{
		this.pageIndex = event.pageIndex;
		this.pageSize = event.pageSize;
		this.refreshProducts(event.pageIndex, event.pageSize);
	}

}