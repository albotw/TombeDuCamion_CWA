import { Component, OnInit} from '@angular/core';
import { PANIER, PANIER_IDS } from '../global';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';//.prod';


@Component({
  selector: 'navbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit
{

  panierOuvert = false;
  value="";

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  request(searchString){
    console.log(searchString);
    this.http.get(environment.API+"/products/"+searchString, { observe: "body", responseType: "json" })
        .subscribe(
          (data) =>
          {
            console.log(data);
          });
  }

  get total()
  {
    let t = 0;
    for (let _=0; _<PANIER.length; _++){
      t += PANIER[_].price * PANIER_IDS[_].number;
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
