import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import DataController from '../../../../shared/DataController';

@Component({
  selector: 'app-compte-achat',
  templateUrl: './compte-achat.component.html',
  styleUrls: ['./compte-achat.component.css']
})
export class CompteAchatComponent implements OnInit {
  product_bought = [];
  totalCount = 0;
  constructor(private route: ActivatedRoute, private router: Router)
	{
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

  ngOnInit(): void {
    this.refreshProducts(0, 20);
  }

  public refreshProducts(pageIndex: number, pageSize: number)
	{

		let offset = pageIndex * pageSize;

		DataController.searchProduct("", pageSize, offset, (data) =>
		{
			this.totalCount = data.meta.totalCount;
			this.product_bought = data.results.map(product =>
			{
				if (product['description'].length > 40)
				{
					product['description'] = product['description'].substring(0, 37) + "...";
				}

				return product;
			})
		});
	}

}