import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { PopupComponent, DialogDataExampleDialog } from './popup/popup.component';
import { CommonModule } from '@angular/common'; 
<<<<<<< HEAD
import {MatButtonModule} from '@angular/material/button'; 
import { ClarityModule } from '@clr/angular';
import {MatListModule} from '@angular/material/list';

=======
>>>>>>> parent of bac497e (Boutons)

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    DialogDataExampleDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    BrowserAnimationsModule,
    MatDialogModule,
<<<<<<< HEAD
    CommonModule,
    MatButtonModule,
    ClarityModule
=======
    CommonModule
>>>>>>> parent of bac497e (Boutons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
