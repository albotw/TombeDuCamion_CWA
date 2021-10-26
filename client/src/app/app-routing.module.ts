
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PageJustinComponent } from './page-justin/page-justin.component';
import { TestApiComponent } from './test-api/test-api.component';
import { HostListener } from "@angular/core";
import { AccueilMobileComponent } from './accueil-mobile/accueil-mobile.component';


const routes: Routes = [
	{ path: '', component: AccueilComponent},
	{ path: 'accueil', component: AccueilComponent },
	{ path: 'lol', component: PageJustinComponent },
	{ path: "test-api", component: TestApiComponent },
	{ path: '**', component: NotfoundComponent },

];

const mobileRoutes: Routes = [
	{ path: '', component: AccueilMobileComponent },
	{ path: 'accueil', component: AccueilMobileComponent },
	{ path: 'lol', component: PageJustinComponent },
	{ path: "test-api", component: TestApiComponent },
	{ path: '**', component: NotfoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot((window.innerWidth > window.innerHeight) ? routes : mobileRoutes),
		],
	exports: [RouterModule]
})
export class AppRoutingModule { }
