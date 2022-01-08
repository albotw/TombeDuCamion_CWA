import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import State, { CacheData } from '../shared/State';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

TabProduits = []; //Tableau des objets ajouté
TotalPanier; // Somme des différents objets du panier
ProductCount;

  constructor(private router : Router) { 
    this.TabProduits = State.get(CacheData.Panier);
  }

  addProductsToTab = (product) => { // methode permettant d'ajouter les produits dans le panier
    this.TabProduits = State.get(CacheData.Panier);
    let productExists = false;
    for ( let i of this.TabProduits) {
      if (i.product.p_uid === product.product.p_uid) {
        i.count++;                       
        productExists = true;
        break;
      }
    }
    if(!productExists){
      this.TabProduits.push({
        count: 1,
        product: product
      });
    }
    State.set(CacheData.Panier, this.TabProduits);
    this.getTotalPanier();
  }

 getTotalPanier(){ 
  this.TabProduits = State.get(CacheData.Panier);// compte le nombre de produit dans le panier
  if(this.TabProduits){
    this.TotalPanier = 0;
    this.TabProduits.forEach((item)=> {
      this.TotalPanier += (item.count * item.product.price);
    });
    return this.TotalPanier;
    };
  }


getProductFromTab = () => {
  this.TabProduits = State.get(CacheData.Panier); // nombre total de produit dans le panier
  return this.TabProduits;
  
}

getProductCount = () => { 
  this.TabProduits = State.get(CacheData.Panier);
  if(this.TabProduits) {
    this.ProductCount = 0;
    this.TabProduits.forEach((item) => {
      this.ProductCount += item.product.count;
    });
    State.set(CacheData.Panier, this.TabProduits);
    return this.ProductCount;
  }
}

ClearTab = () => {
  this.TabProduits = State.get(CacheData.Panier); //efface le panier 
  this.TabProduits = [];
  this.router.navigate(['']);
  State.set(CacheData.Panier, this.TabProduits);
}

RemoveFromTab = (product) => {
  this.TabProduits = State.get(CacheData.Panier);
  this.TabProduits = this.TabProduits.filter((item) => item.product.p_uid !== product.product.p_uid);
  State.set(CacheData.Panier, this.TabProduits);

  if(this.TabProduits.length === 0) {
    this.router.navigate(['']);
  }
  this.getTotalPanier();
}

MoinsFromTab = (product) => {
  this.TabProduits = State.get(CacheData.Panier); // methode pour décrémenter la quantité de l'objet dans le panier 
  for ( let i of this.TabProduits) {
    if(i.product.p_uid === product.product.p_uid) {
      if(i.count === 0 ){
        this.RemoveFromTab(product);
      }
      else { i.count--;
      }
    break;
    }
  }
  State.set(CacheData.Panier, this.TabProduits);
  this.getTotalPanier();
}

}