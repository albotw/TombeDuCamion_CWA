import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PANIER } from '../global';


@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {

	public product: any = {};
  	public p_uid: number = -1;
  
	constructor(private http: HttpClient, private route:ActivatedRoute)
	{
    this.p_uid = Number(this.route.snapshot.paramMap.get('id'));
		this.http.get("https://tombeducamion-api.herokuapp.com/products", { observe: "body", responseType: "json" })
			.subscribe(
				(data) =>
				{
					this.product = data[this.p_uid];
				})
	}

  ngOnInit(): void {
  }

  addToPanier() : number{
	for (let item of PANIER){
		if (item.name == this.product.title){
			item.number += 1;
			return 0;
		}
	}
	PANIER.push({name: this.product.title, number: 1, price: this.product.price});
	return 0;
  }

}
