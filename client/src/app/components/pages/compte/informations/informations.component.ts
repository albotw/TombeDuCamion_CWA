import { Component, OnInit } from '@angular/core';
import { request, gql } from "graphql-request";
import { environment } from "src/environments/environment";

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
    let auth = {uid: "001", token: "123456"};
    this.getUser(auth).then(tab => {this.pseudo=tab[0]});
    this.getUser(auth).then(tab => {this.mail=tab[1]});
    this.getUser(auth).then(tab => {this.moyenne=tab[2]});
    this.getUser(auth).then(tab => {this.ventes=tab[3]});
  }

  public getUser = async (auth: any) =>
	{
		let query = gql`
			query getUser($auth: AuthInfo!) {
        getUser(auth: $auth) {
          uid
          nickname
          email
          totalSales
          notation
        }
      }
		`
    let variables = {
      auth: auth
    }
    let user : any = await request(environment.API + "/graphql", query, variables, { "Content-Type": "application/json" });
    console.log(user);
    var tab = [user.getUser.nickname, user.getUser.email, user.getUser.totalSales, user.getUser.notation];
    console.log(tab);
    return tab;
	}
}