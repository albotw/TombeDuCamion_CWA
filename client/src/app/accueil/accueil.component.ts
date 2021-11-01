import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { HttpClient } from '@angular/common/http';
import { flattenAndSortAnimations } from '@cds/core/internal';
import { environment } from 'src/environments/environment.prod';//.prod';
import { AssertNotNull } from '@angular/compiler';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit
{

  id = 0;

  meilleuresVentes = [];

  startIndex: number[] = [0, 0, 0];

	constructor(private http: HttpClient)
	{
    for (let _=0; _<6; _++){
      let id = Math.floor(Math.random()*60);
      console.log(id);
      let query = `{
        product(p_uid:\"${id}\"){
          p_uid
          seller
          title
          stock
          description
          images
          comments
        }
      }`;
      let variables = null;
      this.http.post(environment.API+"/graphql?", JSON.stringify({ query, variables }), 
        {headers: {"Content-Type": "application/json",}, observe: "body", responseType: "json"}
        )
        .subscribe(
          (data) =>
          {
            data = data['data']['product'];
            if (data['description'].length > 40){
              data['description'] = data['description'].substring(0, 37)+"...";
            }
            this.meilleuresVentes.push(data);
          });
    }
	}


  addIndex(idx): void
  {
    if (this.startIndex[idx] + 4 < this.meilleuresVentes.length)
    {
      this.startIndex[idx] += 1;
    }
  }

  subIndex(idx): void
  {
    if (this.startIndex[idx] > 0)
    {
      this.startIndex[idx] -= 1;
    }
  }

  getVentes(idx)
  {
    let res = [];

    for (let i = 0; i < 4; i++)
    {
      res.push(this.meilleuresVentes[this.startIndex[idx] + i]);
    }
    return res;
  }

  ngOnInit(): void
  {
  }

}
