import { Component, OnInit } from '@angular/core';
import DataController from "../../../shared/DataController";
import State, {CacheData} from "../../../shared/State";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
	nickname: string;
	password: string;
  constructor(private _snackbar : MatSnackBar, private router : Router) {
  }

  ngOnInit(): void {
  }

  connect = () => {
	  DataController.connect(this.nickname, this.password)
		  .then(data => {
			  State.set(CacheData.Auth, data.connect);
			  this._snackbar.open("Connexion réussie");
			  this.router.navigate(["/compte"]);
		  })
		  .catch(error => this._snackbar.open("Erreur lors de la connexion", "Fermer"));
  }
}
