import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from '../../../shared/global'
import { switchMap } from 'rxjs/operators';
import DataController from 'src/app/shared/DataController';

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

  constructor(private _formBuilder: FormBuilder,
              public dialog: MatDialog,
              private http: HttpClient) { }

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
      console.log('RESULT', reader.result);
      this.images.push(reader.result);
    }
    reader.readAsDataURL(file);
  }

  post(): void{
    let title = this.titleGroup.get('title');
    let descr = this.descrGroup.get('descr');
    let stock = this.details1.get('stock');
    let price = this.details1.get('price');
    let category = this.categoryGroup.get('category');
    let product = {
        p_uid: "00e21440870f4c17e2301c9fe5e9f2fcefc0f2e7621982c23f2e9ecc20a24ab9",
        seller: "Prof. Chen", // TODO: Variable global définissant l'utilisateur connecté
        title: title.value,
        stock: stock.value,
        description: descr.value,
        images: this.images,
        category: category.value,
        comments: [],
        notation: -1,
        price: price.value,
        sales: 0,
        views: 0
    }
    console.log(product);
		DataController.postProduct({uid: "bjour", token: "lol"}, 'Jacques', title.value, stock.value, descr.value, category.value, price.value, (data) =>{
      console.log(data);
      DataController.addImageToProduct({uid: "bjour", token: "lol"}, data, this.images[0], (data2) =>{
        console.log(data2);
      });
    });
		
    // TODO: Ajouter un post sur l'API
  }
}
