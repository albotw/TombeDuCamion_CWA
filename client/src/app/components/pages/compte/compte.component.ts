import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import State, { CacheData } from 'src/app/shared/State';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  connected : boolean;

  constructor(private router: Router) {
		this.connected = State.has(CacheData.Auth);
    if (!this.connected){
      this.router.navigate(['connexion']);
    }
  }

  ngOnInit(): void {
  }

}
