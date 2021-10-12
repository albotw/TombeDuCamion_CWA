import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root', // ? nom de la balise lorsque l'on veut utiliser le composant
  templateUrl: './app.component.html',  // ? lien vers la page html de template
  styleUrls: ['./app.component.css']  // ? lien vers la feuille de style
})

export class AppComponent implements OnInit
{
  text: string = "";
  title: string = "TombeDuCamion";
  constructor()
  {

  }

  ngOnInit()
  {

  }


}
