import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NavigationbarComponent } from "./app/navigationbar/navigationbar.component";

const routes: Routes = [
    { path: "navbar", component: NavigationbarComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule
{

}