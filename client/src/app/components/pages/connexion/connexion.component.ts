import { Component, OnInit } from '@angular/core';
import DataController from "../../../shared/DataController";
import State, {CacheData} from "../../../shared/State";
import { data } from '../../../shared/global'
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
	nickname: string;
	password: string;
  DATA: any;

  state = "NOT_CONNECTED";

  constructor(private router: Router) { 
    this.DATA = data;
  }

  ngOnInit(): void {
  }

  connect(): void {
	DataController.connect(this.nickname, this.password, (data) => {
    if (data.uid == "NOT_FOUND" && data.token == "NOT_FOUND"){
      this.state = "WRONG_IDENTIFIER";
    }
    else{
      State.set(CacheData.Auth, data);
      this.state = "CONNECTED";
      this.router.navigate(['accueil']);
    }
	});
  }
}
