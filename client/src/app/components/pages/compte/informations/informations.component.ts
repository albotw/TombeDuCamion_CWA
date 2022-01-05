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
    this.getUser("001").then(nickname => {this.pseudo=nickname});
    this.email = 'axel.axel@';
    this.moyenne = 4.6;
  }

  public getUser = async (id: string) =>
	{
		let query = gql`
			query getUser($id: String!) {
        getUser(uid: $id) {
          uid
          nickname
          email
          totalSales
          notation
        }
      }
		`
    let variables = {
      id: id
    }
    let user : any = await request(environment.API + "/graphql", query, variables, { "Content-Type": "application/json" });
    console.log(user);
    //return user.nickname;
	}
}
