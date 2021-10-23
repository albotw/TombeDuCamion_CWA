import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent, DialogDataExampleDialog } from './page-justin/popup/popup.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ClarityModule } from '@clr/angular';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { DvdComponent, DialogDataComponent } from './page-justin/dvd/dvd.component';
import { PageJustinComponent } from './page-justin/page-justin.component';


@NgModule({
	declarations: [
		AppComponent,
		PopupComponent,
		DialogDataExampleDialog,
		NavigationbarComponent,
		DvdComponent,
		DialogDataComponent,
		PageJustinComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MatListModule,
		BrowserAnimationsModule,
		MatDialogModule,
		CommonModule,
		MatButtonModule,
		ClarityModule,
		DragDropModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
