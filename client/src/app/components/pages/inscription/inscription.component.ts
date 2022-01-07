import { Component, OnInit } from '@angular/core';
import DataController from "../../../shared/DataController";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

    nickname: string;
    email: string;
    password: string;

    snackbar : MatSnackBar;
    constructor(snackBar: MatSnackBar, private router: Router) {
        this.snackbar = snackBar;
    }

    ngOnInit(): void {
    }

    createUser() : void {
        DataController.createUser(this.nickname, this.email, this.password)
            .then(data => {
                this.snackbar.open("Votre compte a été crée. Vous allez être redirigé vers la page de connexion");
                setTimeout(() => {this.router.navigate(["/connexion"])}, 2000);
            })
            .catch(error => {
                console.log(error);
                this.snackbar.open("Identifiants invalides", "Fermer");
            });
    }
}
