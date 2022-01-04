import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';//.prod';
import { NavigationExtras, Router, RouterOutlet } from '@angular/router';
import Cache, { CacheData } from "../../../shared/cache";
import { data } from '../../../shared/global'


import {
	trigger,
	state,
	style,
	animate,
	transition,
  query,
	// ...
  } from '@angular/animations';


@Component({
  selector: 'navbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css'],
	animations: [
		trigger('routeAnimations', [
      transition('* => transition',[
        query(':leave', [
          style({
            opacity: 1,
          }),
        ]),
        query(':enter', [
          style({
            position: 'absolute',
            opacity: 1,
            top: -1100,
            left:0,
          }),
        ]),
        query(':enter', [
          animate('900ms', style({
            position: 'absolute',
            opacity: 1,
            top: 0,
            left: 0,
          })),
        ]),
      ]),
      transition('transition => *', [
        query(':enter', [
          style({
            position: 'absolute',
            opacity: 1,
          }),
        ]),
        query(':leave', [
          style({
            position: 'absolute',
            zIndex: 1,
            opacity: 1,
            top: 0,
            left: 0,
          }),
          animate('900ms', style({
            opacity: 1,
            top: -1100,
            left:0,
          })),
        ]),
      ])
    ])
  ]
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

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
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
