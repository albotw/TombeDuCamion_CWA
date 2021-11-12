import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PANIER, PANIER_IDS } from '../global';
import { environment } from 'src/environments/environment';//.prod';
import DataController from '../shared/DataController';


@Component({
	selector: 'app-detail-produit',
	templateUrl: './detail-produit.component.html',
	styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit
{

	public product: any = {};
	public p_uid: string = "";

	constructor(private http: HttpClient, private route: ActivatedRoute)
	{
		this.p_uid = this.route.snapshot.paramMap.get('id');

		DataController.getProduct(this.p_uid, (data) =>
		{
			this.product = data
		})
	}

	ngOnInit(): void
	{
	}

	addToPanier(): void
	{
		let test = false;
		for (let item of PANIER_IDS)
		{
			if (item.p_uid == this.product.p_uid)
			{
				item.number += 1;
				test = true;
			}
		}
		if (!test)
		{
			PANIER_IDS.push({ p_uid: this.product.p_uid, number: 1, price: parseInt(this.product.price) });
			PANIER.push(this.product);
		}
	}

}
