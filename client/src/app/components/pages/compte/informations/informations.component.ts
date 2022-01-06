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
  email!: string;
  moyenne!: number;
  totalSales !: string;

  constructor() { }

  async ngOnInit() {
    let auth = {uid: "001", token: "123456"};
    this.getUser(auth).then(nickname => {this.pseudo=nickname});
    this.email = 'axel.axel@';
    this.moyenne = 4.6;
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
    return user.getUser.nickname;
	}
}
