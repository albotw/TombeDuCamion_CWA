import { Component, OnInit} from '@angular/core';
import { PANIER } from '../global';


@Component({
  selector: 'navbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit
{

  panierOuvert = false;

	panier = PANIER;

  constructor() { }

  ngOnInit(): void {
  }

  get total()
  {
    let t = 0;
    for (let item of this.panier){
      t += item.price*item.number;
    }
    return t;
  }

}
