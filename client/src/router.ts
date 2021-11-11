import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccueilMobileComponent } from "./app/accueil-mobile/accueil-mobile.component";
import { AccueilComponent } from "./app/accueil/accueil.component";
import { DetailProduitComponent } from "./app/detail-produit/detail-produit.component";
import { NavigationbarComponent } from "./app/navigationbar/navigationbar.component";
import { NotfoundComponent } from "./app/notfound/notfound.component";
import { PageJustinComponent } from "./app/page-justin/page-justin.component";
import { PanierComponent } from "./app/panier/panier.component";
import { ResultatsComponent } from "./app/resultats/resultats.component";
import { TestApiComponent } from "./app/test-api/test-api.component";


const routes: Routes = [
	{ path: '', component: AccueilComponent},
	{ path: 'accueil', component: AccueilComponent },
	{ path: 'lol', component: PageJustinComponent },
	{ path: "test-api", component: TestApiComponent },
	{ path: 'produit/:id', component: DetailProduitComponent },
	{ path: 'recherche/:str', component: ResultatsComponent },
	{ path: 'panier', component: PanierComponent},
	{ path: '**', component: NotfoundComponent },
];

const mobileRoutes: Routes = [
	{ path: '', component: AccueilMobileComponent },
	{ path: 'accueil', component: AccueilMobileComponent },
	{ path: 'lol', component: PageJustinComponent },
	{ path: "test-api", component: TestApiComponent },
	{ path: 'produit/:id', component: DetailProduitComponent },
	{ path: 'recherche/:str', component: ResultatsComponent },
	{ path: 'panier', component: PanierComponent},
	{ path: '**', component: NotfoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot((window.innerWidth > window.innerHeight) ? routes : mobileRoutes,  {onSameUrlNavigation: 'reload'}),
		],
	exports: [RouterModule]
})
export class AppRoutingModule { }
