import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import DataController from '../../../../shared/DataController';
import { data } from '../../../../shared/global';
import IAuthData from '../../../../../../../API/src/interfaces/AuthData'; 
import State, { CacheData } from "../../../../shared/State";
import { AbstractListeComponent } from '../abstract-liste/abstract-liste.component';

@Component({
  selector: 'app-compte-vente',
  templateUrl: '../abstract-liste/abstract-liste.component.html',
  styleUrls: ['../abstract-liste/abstract-liste.component.css']
})

export class CompteVenteComponent extends AbstractListeComponent {

	auth = State.get(CacheData.Auth);
	
	achat = false;

	constructor(route: ActivatedRoute, router: Router){
		super(route, router);
	}

}
