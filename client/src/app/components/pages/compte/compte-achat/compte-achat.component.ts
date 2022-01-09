import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import State, { CacheData } from "../../../../shared/State";
import { AbstractListeComponent } from '../abstract-liste/abstract-liste.component';

@Component({
  selector: 'app-compte-achat',
  templateUrl: '../abstract-liste/abstract-liste.component.html',
  styleUrls: ['../abstract-liste/abstract-liste.component.css']
})

export class CompteAchatComponent extends AbstractListeComponent {

	auth = State.get(CacheData.Auth);
	
	achat = true;

	constructor(route: ActivatedRoute, router: Router){
		super(route, router);
	}

}