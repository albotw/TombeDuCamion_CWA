import { Component, OnInit} from '@angular/core';
import { PANIER, PANIER_IDS } from '../global';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';//.prod';
import { Router, RouterOutlet } from '@angular/router';
import {
	trigger,
	state,
	style,
	animate,
	transition,
  query,
	// ...
  } from '@angular/animations';
import { UrlResolver } from '@angular/compiler';


@Component({
  selector: 'navbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css'],
	animations: [
		trigger('routeAnimations', [
      transition('* => transition',[
        query(':enter', [
          style({ 
            position: 'absolute',
            opacity: 1,
            top: -1000,
            left:0,
          }),
        ]),
        query(':enter', [
          animate('600ms', style({ 
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
            opacity: 0,
          }),
        ]),
        query(':leave', [
          style({
            position: 'absolute',
            opacity: 1,
            top: 0,
            left: 0,
          }),
          animate('600ms', style({
            opacity: 1,
            top: -1000,
            left:0,
          })),
        ]),
      ])
    ])
  ]
})
export class NavigationbarComponent implements OnInit
{

  panierOuvert = false;
  value="";

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  updateRoute(): void{
    this.router.navigate(['recherche', this.value]);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
  
  get total()
  {
    let t = 0;
    for (let _=0; _<PANIER_IDS.length; _++){
      t += PANIER_IDS[_].price * PANIER_IDS[_].number;
    }
    return t;
  }

  get panierIds() { 
    return PANIER_IDS; 
  }

  get panierItems() { 
    return PANIER; 
  }
}
