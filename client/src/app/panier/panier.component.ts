import { Component, OnInit } from '@angular/core';
import { PANIER, PANIER_IDS } from '../global';
import DataController from '../shared/DataController';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  panier:any;
  panierIDs: any;

  constructor() { }

  ngOnInit(): void {
    this.panier = PANIER;
    this.panierIDs = PANIER_IDS;
  }

  addItem(idx: number) : void{
    PANIER_IDS[idx].number += 1;
    this.panierIDs = PANIER_IDS;
  }

  subItem(idx: number) : void{
    PANIER_IDS[idx].number -= 1;
    if (PANIER_IDS[idx].number == 0) {
      PANIER_IDS.splice(idx, 1);
      PANIER.splice(idx, 1);
      this.panier = PANIER;
    }
    this.panierIDs = PANIER_IDS;
  }

  delItem(idx: number) : void{
    PANIER_IDS.splice(idx, 1);
    PANIER.splice(idx, 1);
    this.panierIDs = PANIER_IDS;
    this.panier = PANIER;
  }

  acheter(): void{
    //TODO fonction acheter qui enlève du stock le nombre de produit acheter
  }

}
