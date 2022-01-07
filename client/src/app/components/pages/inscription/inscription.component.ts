import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import DataController from 'src/app/shared/DataController';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  createUserGroup: FormGroup;

  state = 'CREATION';


  constructor(private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createUserGroup = this._formBuilder.group({
      nickname: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  createUser(): void{
    console.log(this.createUserGroup.value.nickname);
    DataController.createUser(this.createUserGroup.value.nickname, this.createUserGroup.value.email, this.createUserGroup.value.password, (data) => {
      if (data=='ALREADY_EXIST'){
        this.state = 'ALREADY_EXIST';
      }
      else{
        this.state = 'CREATED';
        setTimeout(() => {this.router.navigate(['accueil'])}, 2000);
      }
    });
  }

}
