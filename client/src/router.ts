import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccueilComponent } from "./app/components/pages/accueil/accueil.component";
import { DetailProduitComponent } from "./app/components/pages/detail-produit/detail-produit.component";
import { CompteComponent } from "./app/components/pages/compte/compte.component";
import { NotfoundComponent } from "./app/components/pages/notfound/notfound.component";
import { PageJustinComponent } from "./app/components/pages/page-justin/page-justin.component";
import { PanierComponent } from "./app/components/pages/panier/panier.component";
import { PorteTransitionComponentComponent } from "./app/components/template/transitionPorte/porte-transition-component.component";
import { ResultatsComponent } from "./app/components/pages/resultats/resultats.component";
import { TestApiComponent } from "./app/components/pages/test-api/test-api.component";
import { NewSellComponent } from "./app/components/pages/new-sell/new-sell.component";


const routes: Routes = [
	{ path: '', component: AccueilComponent, data: { animation: 'accueil' } },
	{ path: 'accueil', component: AccueilComponent, data: { animation: 'accueil' } },
	{ path: 'newSell', component: NewSellComponent, data: { animation: 'new-sell' } },
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

@NgModule({
	imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
