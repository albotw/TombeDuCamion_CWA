import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import DataController from '../../../../shared/DataController';
import { data } from '../../../../shared/global';
import IAuthData from '../../../../../../../API/src/interfaces/AuthData'; 
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