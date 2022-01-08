import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';//.prod';
import DataController from '../../../shared/DataController';
import State, { CacheData } from "../../../shared/State";
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
	selector: 'app-detail-produit',
	templateUrl: './detail-produit.component.html',
	styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit
{
	public comments: any = {};
	public product: any = {};
	public p_uid: string = "";
	public static instance : DetailProduitComponent;

	constructor(private http: HttpClient, private route: ActivatedRoute, private _bottomSheet: MatBottomSheet)
	{
		this.p_uid = this.route.snapshot.paramMap.get('id');
		console.log(this.p_uid);
		DetailProduitComponent.instance = this;
		DataController.getProduct(this.p_uid, (data) =>
		{
			this.product = data
		})

		DataController.getCommentsOfProduct(this.p_uid, (dataC) =>
		{
			this.comments = dataC
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
			let panier = State.get(CacheData.Panier);
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

			State.set(CacheData.Panier, panier);
			return true;
		}
		else{
			return false;
		}
	}

	addToWishlist() : boolean{
		/*
		if (this.product.stock > 0){
			let alreadyExists = false;
			let userCo = State.get(CacheData.Auth);
			let id1 = userCo.id;
			for (let item of wishlist)
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
			}
			return true;
		}
		else{
			*/
			return false;
		//}
	}
}

@Component({
	selector: 'new-commentary',
	templateUrl: './new-commentary.component.html',
})
export class BottomNewCommSheet {
	stars = 5;
	commentaryGroup: FormGroup;
	p_uid : string;
	constructor(private _formBuilder: FormBuilder, private _bottomSheetRef: MatBottomSheetRef<BottomNewCommSheet>) {
		this.p_uid = DetailProduitComponent.instance.p_uid;
	}

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
		let auth = State.get(CacheData.Auth);
		DataController.postComment(auth, this.p_uid, this.commentaryGroup.value.commentary, this.stars,  (data) =>{});
		this._bottomSheetRef.dismiss();
		//TODO poster le commentaire
	}

}
