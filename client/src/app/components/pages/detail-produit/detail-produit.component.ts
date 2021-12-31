import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';//.prod';
import DataController from '../../../shared/DataController';
import Cache, { CacheData } from "../../../shared/cache";
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-detail-produit',
	templateUrl: './detail-produit.component.html',
	styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit
{

	public product: any = {};
	public p_uid: string = "";

	constructor(private http: HttpClient, private route: ActivatedRoute, private _bottomSheet: MatBottomSheet)
	{
		this.p_uid = this.route.snapshot.paramMap.get('id');

		DataController.getProduct(this.p_uid, (data) =>
		{
			this.product = data
		})
	}

	openBottomSheet(): void {
	  this._bottomSheet.open(BottomNewCommSheet);
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

@Component({
	selector: 'new-commentary',
	templateUrl: './new-commentary.component.html',
})
export class BottomNewCommSheet {
	stars = 5;
	commentaryGroup: FormGroup;
	constructor(private _formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.commentaryGroup = this._formBuilder.group({
		  commentary: ['', Validators.required],
		});
	}

	updateStars(i: number): void{
		if (this.stars == i){
			this.stars = 0;
		}
		else{
			this.stars = i;
		}
	}

	post(): void{
		//TODO poster le commentaire
	}

}