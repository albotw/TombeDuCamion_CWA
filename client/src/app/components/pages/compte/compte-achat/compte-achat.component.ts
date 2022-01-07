import { Component, OnInit } from '@angular/core';
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
	constructor(private route: ActivatedRoute, private router: Router)
	{
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	ngOnInit(): void {
	this.refreshProducts(this.pageIndex, this.pageSize);
	}

	public refreshProducts(pageIndex: number, pageSize: number)
	{
		let offset = pageIndex * pageSize;
		console.log(this.products);
		DataController.searchProduct("","", pageSize, offset, this.DATA.actualSort, this.DATA.filter, (data) =>
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
			print()
		});
	}

	public getServerData(event?: PageEvent)
	{
		this.pageIndex = event.pageIndex;
		this.pageSize = event.pageSize;
		this.refreshProducts(event.pageIndex, event.pageSize);
	}

}