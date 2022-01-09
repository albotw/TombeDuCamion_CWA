import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from '../../../shared/global'
import { switchMap } from 'rxjs/operators';
import DataController from 'src/app/shared/DataController';
import { Router } from '@angular/router';
import State, { CacheData } from 'src/app/shared/State';

@Component({
  selector: 'app-new-sell',
  templateUrl: './new-sell.component.html',
  styleUrls: ['./new-sell.component.css']
})
export class NewSellComponent implements OnInit {
  CATEGORIES = data.categories;

  image1: string;
  images = [];

  titleGroup: FormGroup;
  descrGroup: FormGroup;
  details1: FormGroup;
  categoryGroup: FormGroup;

  posted = false;
  connected : boolean;

  constructor(private _formBuilder: FormBuilder,
              public dialog: MatDialog,
              private router: Router) {
      this.connected = State.has(CacheData.Auth);
      if (!this.connected){
        this.router.navigate(['connexion']);
      }
  }


  ngOnInit(): void {
    this.titleGroup = this._formBuilder.group({
      title: ['', Validators.required],
    });
    this.descrGroup = this._formBuilder.group({
      descr: ['', Validators.required],
    });
    this.details1 = this._formBuilder.group({
      stock: [Validators.required, Validators.min(1)],
      price: [Validators.required, Validators.min(1)],
    });
    this.categoryGroup = this._formBuilder.group({
      category: ['', Validators.required],
    });
  }

  encodeImageFileAsURL(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend =()=> {
      this.images.push(reader.result);
    }
    reader.readAsDataURL(file);
  }

  post = async () => {
    let title = this.titleGroup.get('title');
    let descr = this.descrGroup.get('descr');
    let stock = this.details1.get('stock');
    let price = this.details1.get('price');
    let category = this.categoryGroup.get('category');

    let auth = State.get(CacheData.Auth);

    let name = await DataController.getUser(auth)['nickname'];

    DataController.postProduct(auth, name, title.value, stock.value, descr.value, category.value, price.value, (data) =>{
      for (let i=0; i<this.images.length; i++){
        DataController.addImageToProduct(auth, data, this.images[i], () =>{
          this.posted = (this.images.length-1 == i);
          setTimeout(() => {this.router.navigate(['accueil'])}, 2000);
        });
      }
    });
    
    
		
		
    // TODO: Ajouter un post sur l'API
  }
}
