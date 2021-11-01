import { Component, OnInit} from '@angular/core';
import { PANIER, PANIER_IDS } from '../global';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';//.prod';
import { Router } from '@angular/router';


@Component({
  selector: 'navbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit
{

  panierOuvert = false;
  value="";

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  updateRoute(): void{
    this.router.navigate(['recherche', this.value]);
  }

  get total()
  {
    let t = 0;
    for (let _=0; _<PANIER_IDS.length; _++){
      t += PANIER_IDS[_].price * PANIER_IDS[_].number;
    }
    return t;
  }

  get panierIds() { 
    return PANIER_IDS; 
  }

  get panierItems() { 
    return PANIER; 
  }
}
