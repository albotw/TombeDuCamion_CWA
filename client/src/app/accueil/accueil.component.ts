import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit
{

  meilleuresVentes = [
    { name: 'Hand Spinner', price: 5.00, description: 'Bah c\'est un hand spinner', rating: 4.78, src: './assets/img/handspinner.jpeg' },
    { name: 'Hand Spinner', price: 5.00, description: 'Bah c\'est un hand spinner', rating: 4.23, src: './assets/img/handspinner.jpeg' },
    { name: 'Hand Spinner', price: 5.00, description: 'Bah c\'est un hand spinner', rating: 4.45, src: './assets/img/handspinner.jpeg' },
    { name: 'Hand Spinner', price: 5.00, description: 'Bah c\'est un hand spinner', rating: 4.86, src: './assets/img/handspinner.jpeg' },
    { name: 'Hand Spinner', price: 5.00, description: 'Bah c\'est un hand spinner', rating: 4.43, src: './assets/img/handspinner.jpeg' },
    { name: 'Hand Spinner', price: 5.00, description: 'Bah c\'est un hand spinner', rating: 4.19, src: './assets/img/handspinner.jpeg' },
  ]

  startIndex: number = 0;

  constructor() { }

  addIndex(): void
  {
    if (this.startIndex + 4 < this.meilleuresVentes.length)
    {
      this.startIndex += 1;
    }
  }

  subIndex(): void
  {
    if (this.startIndex > 0)
    {
      this.startIndex -= 1;
    }
  }

  getVentes()
  {
    let res = [];

    console.log(this.meilleuresVentes['0']);
    for (let i = 0; i < 4; i++)
    {
      res.push(this.meilleuresVentes[this.startIndex + i]);
      console.log(res, this.startIndex + i);
    }
    return res;
  }

  ngOnInit(): void
  {
  }

}
