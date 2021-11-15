import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';//.prod';
import { Router } from '@angular/router';
import Cache, { CacheData } from "../shared/cache";


@Component({
	selector: 'navbar',
	templateUrl: './navigationbar.component.html',
	styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit
{

	panierOuvert = false;
	value = "";

	constructor(private router: Router)
	{
	}

	ngOnInit(): void
	{
	}

	updateRoute(): void
	{
		this.router.navigate(['recherche', this.value]);
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
