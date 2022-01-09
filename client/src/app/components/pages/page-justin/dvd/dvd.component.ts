import { Component, OnInit } from '@angular/core';
import { HostListener, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-dvd',
  templateUrl: './dvd.component.html',
  styleUrls: ['./dvd.component.css']
})
export class DvdComponent implements OnInit {

  posx : number = 250;
  posy: number = 250;

  heightUser : number = 250;
  heightBot  : number = 250;

  addx = true;
  addy = true;

  moving = true;
  
  colors : string[] = ['red', 'blue', 'pink', 'yellow', 'green', 'black', 'white', 'orange', 'purple', 'brown'];

  screenHeight : number = 0;
  screenWidth : number = 0;

  dvdStyle = {
    'position':   'absolute',
    'top':        this.posy+'px',
    'left':       this.posx+'px',
    'z-index':    '8',
    'visibility': 'visible'
  }

  botStyle = {
    'position': 'absolute',
    'top':      this.heightBot+'px',
    'left':     '0px',
    'z-index':  '8'
  }

  userStyle = {
    'position': 'absolute',
    'top':      this.heightUser+'px',
    'left':     '0px',
    'z-index':  '8'
  }

  h1Style = {
    'color':    'red',
    'z-index':  '6'
  }

  dialogRef = undefined;


  constructor(public dialog: MatDialog) { 
    this.onResize();
  }

  ngOnInit(): void {
    this.callMoving();
  }

  callMoving(){
    setTimeout(() => {this.move();}, 1);
  }


  move() {
    let perdu = false;

    if (this.addx) { //(this.posx + 10 + 100 > this.screenWidth){
      this.posx = this.posx + 1;
    }
    else{
      this.posx = this.posx - 1;
    }
    if (this.addy) { //(this.posy + 10 + 100 > this.screenHeight){
      this.posy = this.posy + 1;
    }
    else{
      this.posy = this.posy - 1;
    }

    if (this.posx + 170 > this.screenWidth || this.posx < 0){
      perdu = true;
    }

    if ((this.posx + 170 > this.screenWidth && this.posy + 120 > this.heightBot && this.posy < this.heightBot + 100) 
        || (this.posx < 0 && this.posy + 120 > this.heightUser && this.posy < this.heightUser + 100)){
      this.addx = !this.addx;
      this.h1Style['color'] = this.colors[Math.floor(Math.random() * 10)];
      perdu = false;
    }

    if (this.posy + 120 > this.screenHeight || this.posy < 0){
      this.addy = !this.addy;
      this.h1Style['color'] = this.colors[Math.floor(Math.random() * 10)];
    }


    this.dvdStyle['left'] = this.posx + 'px';
    this.dvdStyle['top'] = this.posy + 'px';

    this.heightBot       = this.posy;
    this.botStyle['top'] = this.heightBot + 'px';

    if (perdu){
      this.dvdStyle['visibility'] = 'hidden';
      this.moving = false;
      this.posx = 250;
      this.posy = 250;
      this.dvdStyle['left'] = this.posx + 'px';
      this.dvdStyle['top'] = this.posy + 'px';
    }
    else{
      this.callMoving();
    }
  }

  launch(){
    this.dvdStyle['visibility'] = 'visible';
    if (!this.moving){
      this.moving = true;
      this.addx = true;
      this.addy = true;
      this.callMoving();
    }

  }


  openDialog() {
    this.dialogRef = this.dialog.open(DialogDataComponent, {
      data: {
        animal: 'panda'
      },
      width: '350px',
      height: '350px',
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.botStyle['left'] = (this.screenWidth-40) + 'px';
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.keyCode === KEY_CODE.UP_ARROW) {
      this.up();
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      this.down();
    }
  }

  up() {
    if (this.heightUser > 0){
      this.heightUser -= 50;
      this.userStyle['top'] = this.heightUser + 'px';
    }
  }

  down() {
    if (this.heightUser < this.screenHeight - 100){
      this.heightUser += 50;
      this.userStyle['top'] = this.heightUser + 'px';
    }
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
        this.rot += 1;
        if (this.rot == 360){
          this.rot = 0;
        }
        this.newRot();
      }, 10);
    
  }

}
