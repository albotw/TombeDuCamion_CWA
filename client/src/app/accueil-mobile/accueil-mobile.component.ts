import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-mobile',
  templateUrl: './accueil-mobile.component.html',
  styleUrls: ['./accueil-mobile.component.css']
})
export class AccueilMobileComponent implements OnInit {

  meilleuresVentes = [
    { name: 'Hand Spinner', price: 5.00, description: 'Bah c\'est un hand spinner', rating: 4.78, src: '../../assets/img/handspinner.jpeg' },
    { name: 'Hand Spinner', price: 5.00, description: 'Bah c\'est un hand spinner', rating: 4.23, src: '../../assets/img/handspinner.jpeg' },
    { name: 'Hand Spinner', price: 5.00, description: 'Bah c\'est un hand spinner', rating: 4.45, src: '../../assets/img/handspinner.jpeg' },
    { name: 'Hand Spinner', price: 5.00, description: 'Bah c\'est un hand spinner', rating: 4.86, src: '../../assets/img/handspinner.jpeg' },
    { name: 'Hand Spinner', price: 5.00, description: 'Bah c\'est un hand spinner', rating: 4.43, src: '../../assets/img/handspinner.jpeg' },
    { name: 'Hand Spinner', price: 5.00, description: 'Bah c\'est un hand spinner', rating: 4.19, src: '../../assets/img/handspinner.jpeg' },
  ]

  startIndex: number[] = [0, 0, 0];

  constructor() { }

  addIndex(idx): void
  {
    if (this.startIndex[idx] < this.meilleuresVentes.length - 1  )
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
    return [this.meilleuresVentes[this.startIndex[idx]]];

  }

  ngOnInit(): void {
  }

}
