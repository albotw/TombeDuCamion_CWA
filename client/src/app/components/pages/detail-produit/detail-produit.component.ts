import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';//.prod';
import DataController from '../../../shared/DataController';
import Cache, { CacheData } from "../../../shared/cache";

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

	addToPanier(): boolean
	{
		if (this.product.stock > 0){
			let alreadyExists = false;
			let panier = Cache.get(CacheData.Panier);
			for (let item of panier)
			{
				if (item.product.p_uid == this.product.p_uid)
				{
					item.count += 1;
					alreadyExists = true;
				}
			}
			if (!alreadyExists)
			{
				let toCache = {
					count: 1,
					product: this.product,
				}
				panier.push(toCache);
			}
	
			Cache.set(CacheData.Panier, panier);
			return true;
		}
		else{
			return false;
		}
	}

}
