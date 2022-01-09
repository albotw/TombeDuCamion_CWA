import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';//.prod';
import { NavigationExtras, Router, RouterOutlet } from '@angular/router';
import State, { CacheData } from "../../../shared/State";
import { data } from '../../../shared/global';





@Component({
  selector: 'navbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css'],
})
export class NavigationbarComponent implements OnInit
{
	public static instance;
  	CATEGORIES = data.categories;
	panierOuvert = false;
	value = "";
  	cat = "";
 	DATA: any;
	connected : boolean;

	constructor(private router: Router)
	{
    	this.DATA = data;
		NavigationbarComponent.instance = this;
	}

	ngOnInit(): void{
		this.connected = State.has(CacheData.Auth);
	}

	updateRoute(): void
	{
		let navextra : NavigationExtras = {
		  queryParams: {
			str: this.value,
			cat: this.cat
		  }
		}
		this.router.navigate(['recherche'],  navextra);
	}

	toggleDarkMode() {
        data.darkmode = !data.darkmode;
    }

	get total()
	{
		let panier = State.get(CacheData.Panier);
		let t = 0;
		for (let i = 0; i < panier.length; i++)
		{
			t += panier[i].product.price * panier[i].count;
		}
		return t;
	}

	get panier()
	{
		return State.get(CacheData.Panier);
	}

}
