import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.callDialog();
  }

  callDialog(){
    setTimeout(() => {this.openDialog()}, Math.floor(Math.random() * 990 + 10));
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda'
      },
      backdropClass: 'test',
      panelClass: 'test',
      width: '50%',
      height:'50%',
      position: {
        right:Math.floor(Math.random()*1000)+"px",
        top:Math.floor(Math.random()*1000)+"px",
        },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.callDialog();
    });
  }
}

@Component({
  selector: 'dialog-data-1',
  templateUrl: '../dialog-data/dialog-data-1.html',
  styleUrls: ['../dialog-data/dialog-data-1.css'],
})


export class DialogDataExampleDialog{
  rot : number = 20;
  sca : number = 20;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) 
  {
    this.newRot();
  }
  
  newRot(){
    setTimeout(() => {
        this.rot += Math.floor(Math.random() * 30 + 10);
        this.sca  = Math.random() * 0.5 + 0.5;
        this.newRot();
      }, 100);
    
  }

}
