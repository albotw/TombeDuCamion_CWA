import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent, DialogDataExampleDialog } from './components/pages/page-justin/popup/popup.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ClarityModule } from '@clr/angular';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavigationbarComponent } from './components/template/navigationbar/navigationbar.component';
import { DvdComponent, DialogDataComponent } from './components/pages/page-justin/dvd/dvd.component';
import { PageJustinComponent } from './components/pages/page-justin/page-justin.component';
import { AccueilComponent } from './components/pages/accueil/accueil.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FooterComponent } from './components/template/footer/footer.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TestApiComponent } from './components/pages/test-api/test-api.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { WassimComponent } from './components/template/chat/wassim.component';
import { DetailProduitComponent } from './components/pages/detail-produit/detail-produit.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultatsComponent } from './components/pages/resultats/resultats.component';
import { PanierComponent } from './components/pages/panier/panier.component';
import { PorteTransitionComponentComponent } from './components/template/transitionPorte/porte-transition-component.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CompteComponent } from './components/pages/compte/compte.component';
import { ListeComponent } from './components/pages/compte/liste/liste.component';
import { InformationsComponent } from './components/pages/compte/informations/informations.component';
import {MatSelectModule} from '@angular/material/select';
import { NewSellComponent } from './components/pages/new-sell/new-sell.component';
import {MatStepperModule} from '@angular/material/stepper';
import { NewSellAddUrlDialog } from './components/pages/new-sell/new-sell.component';


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
		WassimComponent,
		DetailProduitComponent,
		ResultatsComponent,
		PanierComponent,
		PorteTransitionComponentComponent,
		CompteComponent,
		ListeComponent,
		InformationsComponent,
 		NewSellComponent,
		NewSellAddUrlDialog,
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
		MatPaginatorModule,
		MatSelectModule,
		MatStepperModule,
		ReactiveFormsModule,
		FormsModule,
	],
	providers: [
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
