import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccueilMobileComponent } from "./app/accueil-mobile/accueil-mobile.component";
import { AccueilComponent } from "./app/accueil/accueil.component";
import { CompteComponent } from "./app/compte/compte.component";
import { DetailProduitComponent } from "./app/detail-produit/detail-produit.component";
import { NavigationbarComponent } from "./app/navigationbar/navigationbar.component";
import { NotfoundComponent } from "./app/notfound/notfound.component";
import { PageJustinComponent } from "./app/page-justin/page-justin.component";
import { PanierComponent } from "./app/panier/panier.component";
import { PorteTransitionComponentComponent } from "./app/porte-transition-component/porte-transition-component.component";
import { ResultatsComponent } from "./app/resultats/resultats.component";
import { TestApiComponent } from "./app/test-api/test-api.component";


const routes: Routes = [
	{ path: '', component: AccueilComponent, data: { animation: 'accueil' } },
	{ path: 'accueil', component: AccueilComponent, data: { animation: 'accueil' } },
	{ path: 'transition/:id/:opt', component: PorteTransitionComponentComponent, data: { animation: 'transition' } },
	{ path: 'transition/:id', component: PorteTransitionComponentComponent, data: { animation: 'transition' } },
	{ path: 'transition', component: PorteTransitionComponentComponent, data: { animation: 'transition' } },
	{ path: 'lol', component: PageJustinComponent },
	{ path: "test-api", component: TestApiComponent },
	{ path: 'produit/:id', component: DetailProduitComponent, data: { animation: 'produit' } },
	{ path: 'recherche/:str', component: ResultatsComponent },
	{ path: 'panier', component: PanierComponent},
	{ path: 'compte', component: CompteComponent},
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
