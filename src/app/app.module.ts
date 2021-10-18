import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { PopupComponent, DialogDataExampleDialog } from './popup/popup.component';
import { CommonModule } from '@angular/common'; 
import {MatButtonModule} from '@angular/material/button'; 
import { ClarityModule } from '@clr/angular';

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
    CommonModule,
    MatButtonModule
    BrowserAnimationsModule,
    ClarityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
