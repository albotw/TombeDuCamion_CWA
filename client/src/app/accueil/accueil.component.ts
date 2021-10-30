import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { HttpClient } from '@angular/common/http';
import { flattenAndSortAnimations } from '@cds/core/internal';


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
		this.http.get("/api/products", { observe: "body", responseType: "json" })
			.subscribe(
				(data) =>
				{
          for (let _=0; _<6; _++){
            this.meilleuresVentes.push(data[Math.floor(Math.random()*800)]);
          }
				})
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

    console.log(this.meilleuresVentes['0']);
    for (let i = 0; i < 4; i++)
    {
      res.push(this.meilleuresVentes[this.startIndex[idx] + i]);
      console.log(res, this.startIndex[idx] + i);
    }
    return res;
  }

  ngOnInit(): void
  {
  }

}
