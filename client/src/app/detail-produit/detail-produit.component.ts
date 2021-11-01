import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PANIER, PANIER_IDS } from '../global';
import { environment } from 'src/environments/environment.prod';//.prod';


@Component({
	selector: 'app-detail-produit',
	templateUrl: './detail-produit.component.html',
	styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit
{

	public product: any = {};
	public p_uid: number = -1;

	constructor(private http: HttpClient, private route: ActivatedRoute)
	{
		this.p_uid = Number(this.route.snapshot.paramMap.get('id'));
		let query = `{
			product(p_uid:\"${this.p_uid}\"){
			p_uid
			seller
			title
			price
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
				this.product = data;
			});
	}

	ngOnInit(): void {
	}
	
	addToPanier(): void {
		let test = false;
		for (let item of PANIER_IDS)
		{
			if (item.p_uid == this.product.p_uid)
			{
				item.number += 1;
				test = true;
			}
		}
		if (!test){
			PANIER_IDS.push({ p_uid: this.product.p_uid, number: 1, price: parseInt(this.product.price)});
			PANIER.push(this.product);
		}
	}

}
