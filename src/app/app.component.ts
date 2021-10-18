import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatListOption } from '@angular/material/list'

@Component({
  selector: 'app-root', // ? nom de la balise lorsque l'on veut utiliser le composant
  templateUrl: './app.component.html',  // ? lien vers la page html de template
  styleUrls: ['./app.component.css']  // ? lien vers la feuille de style
})

export class AppComponent implements OnInit
{
  text: string = "";
  title: string = "TombeDuCamion";

  collaborateurs : {idx: number, nom:string, fonction :string, ambition:string}[] = [
    {idx:0, nom: 'Yann TROU',                fonction:'Chef de Projet',              ambition: 'Staline incarné'},
    {idx:1, nom: 'Matthieu JOULAIN',         fonction:'Codeur',                      ambition: 'AD Carry programmation'},
    {idx:2, nom: 'Jonathan MARTIN-MAESTRE',  fonction:'Responsable Communication',   ambition: '?'},
    {idx:3, nom: 'Justin BIZOUARD',          fonction:'Responsable Qualité',         ambition: '10E'},
    {idx:4, nom: 'Axel TOUSSENEL',           fonction:'Codeur',                      ambition: 'le S tu connais'},
    {idx:5, nom: 'Wassim DJELLAT',           fonction:'Codeur',                      ambition: 'futur chomeur'},
    {idx:6, nom: 'Arthur NICOLLE',           fonction:'Stagiaire',                   ambition: 'le stagiaire de 3ème'},
  ]

  collab : {idx: number, nom:string, fonction :string, ambition:string} |undefined;
  constructor()
  {

  }


  onGroupsChange(options: MatListOption[]) {
    // map these MatListOptions to their values
    let i = options.map(o => o.value)[0];

    this.collab = this.collaborateurs[i];
  }

  ngOnInit()
  {

  }


}

