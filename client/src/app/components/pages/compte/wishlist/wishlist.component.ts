import { Component, OnInit } from '@angular/core';
import { environment } from "src/environments/environment";
import DataController from '../../../../shared/DataController';
import State, { CacheData } from "../../../../shared/State";
import { request, gql } from "graphql-request";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];
  product: any;
  products: any[] = [];
  auth: any;

  constructor() { }

  ngOnInit(): void {
    this.auth = State.get(CacheData.Auth);   //utilisateur connecté
    this.getWishlist(this.auth).then (wish => {
      this.wishlist=wish;
      for(let item of this.wishlist){
        DataController.getProduct(item, (product) => {this.product=product;
          this.products.push(this.product);
        });
      }
    });
  }

  //récupérer la wishlist en fonction de l'id d'un user
  public getWishlist = async (auth: any) =>
	{
		let query = gql`
		query getWishlist($auth: AuthInfo) {
			getWishlist(auth: $auth)
		}
	`
    let variables = {
      auth: auth
    }
    let wish : any = await request(environment.API + "/graphql", query, variables, { "Content-Type": "application/json" });
    return wish.getWishlist;
	}

  //supprimer un élément de la wishlist
  public removeFromWishlist = async (product: string) =>
	{
		let query = gql`
		mutation removeFromWishlist($auth: AuthInfo!, $product: ID!) {
      removeFromWishlist(auth: $auth, product: $product)
    }
	  `
    let variables = {
      auth: this.auth,
      product: product
    }
    let wish : any = await request(environment.API + "/graphql", query, variables, { "Content-Type": "application/json" });
    return wish.removeFromWishlist;
	}

}
