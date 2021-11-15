import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../router';
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
import { AccueilComponent } from './accueil/accueil.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FooterComponent } from './footer/footer.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NotfoundComponent } from './notfound/notfound.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TestApiComponent } from './test-api/test-api.component';
import { HttpClientModule } from '@angular/common/http';
import { AccueilMobileComponent } from './accueil-mobile/accueil-mobile.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatDividerModule} from '@angular/material/divider';
import { WassimComponent } from './wassim/wassim.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ResultatsComponent } from './resultats/resultats.component';
import { PanierComponent } from './panier/panier.component';
import { PorteTransitionComponentComponent } from './porte-transition-component/porte-transition-component.component';


@NgModule({
	declarations: [
		AppComponent,
		PopupComponent,
		DialogDataExampleDialog,
		NavigationbarComponent,
		DvdComponent,
		DialogDataComponent,
		PageJustinComponent,
		AccueilComponent,
		FooterComponent,
		NotfoundComponent,
		TestApiComponent,
  AccueilMobileComponent,
  NavbarMobileComponent,
  WassimComponent,
  DetailProduitComponent,
  ResultatsComponent,
  PanierComponent,
  PorteTransitionComponentComponent
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
		MatTabsModule,
		MatButtonToggleModule,
		MatInputModule,
		MatCardModule,
		MatGridListModule,
		MatIconModule,
		MatBadgeModule,
		OverlayModule,
		MatProgressBarModule,
		HttpClientModule,
		MatSidenavModule,
		MatDividerModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
		FormsModule,
	],
	providers: [
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
