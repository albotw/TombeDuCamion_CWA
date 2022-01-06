import { Component, OnInit } from '@angular/core';
import DataController from "../../../shared/DataController";
import State, {CacheData} from "../../../shared/State";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
	nickname: string;
	password: string;
  constructor() { }

  ngOnInit(): void {
  }

  connect = () => {
	DataController.connect(this.nickname, this.password, (data => {
		State.set(CacheData.Auth, data);
	}))
  }
}
