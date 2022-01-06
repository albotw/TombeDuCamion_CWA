import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

TabProduits = []; //Tableau des objets ajouté
TotalPanier; // Somme des différents objets du panier
ProductCount;

  constructor(private router : Router) { }

  addProductsToTab = (product) => { // methode permettant d'ajouter les produits dans le panier
    let productExists = false;
    for ( let i in this.TabProduits) {
      if (this.TabProduits[i].puid === product.puid) {
        this.TabProduits[i].stock++;
        productExists = true;
        this.getTotalPanier();
        //break;
      }
    }
    if(!productExists){
      this.TabProduits.push({
        puid: product.puid,
        nom: product.title,
        prix: product.price,
        description: product.description,
        stock: 1,
        url: product.url
      });
    }
    this.getTotalPanier();
  }

 getTotalPanier(){ // compte le nombre de produit dans le panier
  if(this.TabProduits){
    this.TotalPanier = 0;
    this.TabProduits.forEach((product)=> {
      this.TotalPanier += (product.stock * product.price);
    });
    return this.TotalPanier;
    };
  }


getProductFromTab = () => { // nombre total de produit dans le panier
  return this.TabProduits;
}

getProductCount = () => { 

  if(this.TabProduits) {
    this.ProductCount = 0;
    this.TabProduits.forEach((product) => {
      this.ProductCount += product.stock;
    });
    return this.ProductCount;
  }
}

ClearTab = () => { //efface le panier 
  this.TabProduits = [];
  this.router.navigate(['']);
}

RemoveFromTab = (product) => {
this.TabProduits = this.TabProduits.filter((item) => item.puid ! == product.puid);
  if(this.TabProduits.length === 0) {
    this.router.navigate(['']);
  }
  this.getTotalPanier();
}

MoinsFromTab = (product) => { // methode pour décrémenter la quantité de l'objet dans le panier 
for ( let i in this.TabProduits) {
  if(this.TabProduits[i].puid === product.puid) {
    if(this.TabProduits[i].stock === 0 ){
      this.RemoveFromTab(product);
    }
    else { this.TabProduits[i].stock--;
    }
  this.getTotalPanier();
  break;
  }
}
this.getTotalPanier();
}

getProductList = () => {
  return [
    {
      "puid" : "1",
      "title": "Pokeball",
      "prix" : 400,
      "url" : "assets/img/camion.png"
    }
    ]
  }
}






