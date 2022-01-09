import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import DataController from '../../../../shared/DataController';
import { data } from '../../../../shared/global';
import IAuthData from '../../../../../../../API/src/interfaces/AuthData'; 
import State, { CacheData } from "../../../../shared/State";


@Component({
  selector: 'app-abstract-liste',
  templateUrl: './abstract-liste.component.html',
  styleUrls: ['./abstract-liste.component.css']
})

export class AbstractListeComponent implements OnInit {
	auth = State.get(CacheData.Auth);
	products = [];
	totalCount = 0;
	actualSort = "NO_SORT";
	history = [];
	DATA = data;
	pageIndex = 0;
	pageSize = 16;	
    achat: boolean;
	@ViewChild('paginator') paginator: MatPaginator;

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
            if (this.achat){
              this.history = data.filter(item => item.type == 'BUY');
            }
            else{
              this.history = data.filter(item => item.type == 'SELL');
            }
            this.getProducts();
        });
	}

	public getProducts()
	{
    	this.products = [];
		for(const product in this.history)
		{
			DataController.getProduct(this.history[product].product, (data) =>
			{
				this.products.push(data);
			});
		}
	}

}