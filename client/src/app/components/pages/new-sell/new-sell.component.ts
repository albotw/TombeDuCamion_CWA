import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-sell',
  templateUrl: './new-sell.component.html',
  styleUrls: ['./new-sell.component.css']
})
export class NewSellComponent implements OnInit {
  CATEGORIES = ['Jouets', 'Informatique', 'Vêtements']

  images = [];

  titleGroup: FormGroup;
  descrGroup: FormGroup;
  details1: FormGroup;
  category: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.titleGroup = this._formBuilder.group({
      title: ['', Validators.required],
    });
    this.descrGroup = this._formBuilder.group({
      descr: ['', Validators.required],
    });
    this.details1 = this._formBuilder.group({
      stock: [0, Validators.required],
      price: [0, Validators.required],
    });
    this.category = this._formBuilder.group({
      category: ['', Validators.required],
    });
  }


  post(): void{

    let title = this.titleGroup.get('title');
    let descr = this.descrGroup.get('descr');
    let stock = this.details1.get('stock');
    let price = this.details1.get('price');
    let category = this.category.get('category');
    let product = {
      p_uid: "00e21440870f4c17e2301c9fe5e9f2fcefc0f2e7621982c23f2e9ecc20a24ab9",
        seller: "Prof. Chen", // TODO: Variable global définissant l'utilisateur connecté
        title: title,
        stock: stock,
        description: descr,
        images: this.images,
        category: category,
        comments: [],
        notation: 0.808,
        price: price,
        sales: 0,
        views: 0
    }
    // TODO: Ajouter un post sur l'API
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewSellAddUrlDialog, {
      width: '250px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.images.push(result);
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './new-sell-addurl.component.html',
})
export class NewSellAddUrlDialog {
  constructor(
    public dialogRef: MatDialogRef<NewSellAddUrlDialog>,
    @Inject(MAT_DIALOG_DATA) public data: String,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}