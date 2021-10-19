import { Component, OnInit } from '@angular/core';
import { HostListener, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


@Component({
  selector: 'app-dvd',
  templateUrl: './dvd.component.html',
  styleUrls: ['./dvd.component.css']
})
export class DvdComponent implements OnInit {

  posx : number = 250;
  posy: number = 250;

  addx = true;
  addy = true;
  
  colors = ['red', 'blue', 'pink', 'yellow', 'green', 'black', 'white', 'orange', 'purple', 'brown'];

  screenHeight : number = 0;
  screenWidth : number = 0;

  dvdStyle = {
    'position': 'absolute',
    'top':      this.posy+'px',
    'left':     this.posx+'px',
    'z-index':  '8'
  }

  h1Style = {
    'color':    'red',
    'z-index':  '6'
  }


  constructor(public dialog: MatDialog) { 
    this.onResize();
  }

  ngOnInit(): void {
    this.callMoving();
  }

  callMoving(){
    setTimeout(() => {this.move()}, 25);
  }


  move() {

    if (this.addx) { //(this.posx + 10 + 100 > this.screenWidth){
      this.posx = this.posx + 10;
    }
    else{
      this.posx = this.posx - 10;
    }
    if (this.addy) { //(this.posy + 10 + 100 > this.screenHeight){
      this.posy = this.posy + 10;
    }
    else{
      this.posy = this.posy - 10;
    }

    if (this.posx + 100 > this.screenWidth || this.posx < 0){
      this.addx = !this.addx;
      this.h1Style['color'] = this.colors[Math.floor(Math.random() * 10)];
    }

    if (this.posy + 100 > this.screenHeight || this.posy < 0){
      this.addy = !this.addy;
      this.h1Style['color'] = this.colors[Math.floor(Math.random() * 10)];
    }

    this.dvdStyle['left'] = this.posx + 'px';
    this.dvdStyle['top'] = this.posy + 'px';


    this.callMoving();
  }


  openDialog() {
    console.log("test");
    let dialogRef = this.dialog.open(DialogDataComponent, {
      data: {
        animal: 'panda'
      },
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }


}

@Component({
  selector: 'dialog-data-1',
  templateUrl: '../dialog-data/dialog-data-1.html',
  styleUrls: ['../dialog-data/dialog-data-1.css'],
})


export class DialogDataComponent{
  rot : number = 20;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) 
  {
    this.newRot();
  }
  
  newRot(){
    setTimeout(() => {
        this.rot += 10;
        this.newRot();
      }, 100);
    
  }

}
