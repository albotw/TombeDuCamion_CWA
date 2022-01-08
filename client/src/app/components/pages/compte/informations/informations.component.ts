import { Component, OnInit } from '@angular/core';
import { request, gql } from "graphql-request";
import { environment } from "src/environments/environment";
import DataController from '../../../../shared/DataController';
import State, { CacheData } from "../../../../shared/State";

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {
  pseudo: string;
  mail!: string;
  moyenne!: number;
  ventes !: string;

  constructor() { }

  async ngOnInit() {
    let auth = State.get(CacheData.Auth);
    this.getUser(auth).then(tab => {this.pseudo=tab[0]});
    this.getUser(auth).then(tab => {this.mail=tab[1]});
    this.getUser(auth).then(tab => {this.moyenne=tab[3]});
    this.getUser(auth).then(tab => {this.ventes=tab[2]});
  }

  public getUser = async (auth: any) =>	{
    
		let user : any = await DataController.getUser(auth);
		console.log(user);
		var tab = [user.getUser.nickname, user.getUser.email, user.getUser.totalSales, user.getUser.notation];
		console.log(tab);
		return tab;
  }

}
