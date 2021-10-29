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

  startIndex: number[] = [0, 0, 0];

  constructor() { }

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
