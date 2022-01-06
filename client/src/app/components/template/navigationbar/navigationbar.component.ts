import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';//.prod';
import { NavigationExtras, Router, RouterOutlet } from '@angular/router';
import Cache, { CacheData } from "../../../shared/Cache";
import { data } from '../../../shared/global'





@Component({
  selector: 'navbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css'],
})
export class NavigationbarComponent implements OnInit
{

  CATEGORIES = data.categories;

	panierOuvert = false;
	value = "";
  cat = "";
  DATA: any;

	constructor(private router: Router)
	{
    this.DATA = data;
	}

	ngOnInit(): void{
	}

	updateRoute(): void
	{
    let navextra : NavigationExtras = {
      queryParams: {
        str: this.value,
        cat: this.cat
      },
      fragment: 'anchor'
    }
		this.router.navigate(['recherche'],  navextra);
	}

	get total()
	{
		let panier = Cache.get(CacheData.Panier);
		let t = 0;
		for (let i = 0; i < panier.length; i++)
		{
			t += panier[i].product.price * panier[i].count;
		}
		return t;
	}

	get panier()
	{
		return Cache.get(CacheData.Panier);
	}

}
