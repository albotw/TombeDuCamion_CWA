import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-wassim',
  templateUrl: './wassim.component.html',
  styleUrls: ['./wassim.component.css']
})
export class WassimComponent implements OnInit {
  isOpen = false;
  hidden = false;
  msgs = [];

  constructor() { }

  ngOnInit(): void {
  }

  startConv(): void{
    if (!this.isOpen){
      this.msgs = [];
    }
    else{
      this.msgs.push('Salut mon coquin ;)');

      setTimeout( () => {
        if (this.msgs.length == 1){
          this.msgs.push('Soit pas timide ;)');
        }
      }, 2500);

      setTimeout( () => {
        if (this.msgs.length == 2){
          this.msgs.push('Je me sens très seul :(');
        }
      }, 5000);

      setTimeout( () => {
        if (this.msgs.length == 3){
          this.msgs.push('Rejoins-moi vite sur http://ceciestunearnaque.fr/');
        }
      }, 7500);
    }

    
  }

}
