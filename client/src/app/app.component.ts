import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { data } from './shared/global';
import {RouterOutlet} from "@angular/router";
import {animate, query, style, transition, trigger} from "@angular/animations";

@Component({
	selector: 'app-root', // ? nom de la balise lorsque l'on veut utiliser le composant
	templateUrl: './app.component.html',  // ? lien vers la page html de template
	styleUrls: ['./app.component.css'],  // ? lien vers la feuille de style
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


export class AppComponent implements OnInit
{
	wHeight: number;
	wWidth: number;
	DATA: any;


	constructor()
	{
		this.DATA = data;
	}

	ngOnInit()
	{
		this.wHeight = window.innerHeight;
		this.wWidth = window.innerWidth;
		// let cache = JSONcache.instance();
	}

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
	}
}

