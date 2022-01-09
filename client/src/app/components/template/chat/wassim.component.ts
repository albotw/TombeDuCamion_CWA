import { Component, OnInit  } from '@angular/core';
import { data } from '../../../shared/global';

@Component({
  selector: 'app-wassim',
  templateUrl: './wassim.component.html',
  styleUrls: ['./wassim.component.css']
})
export class WassimComponent implements OnInit {
  isOpen = false;
  hidden = false;
  msgs = [];
  inpstr = '';
  DATA: any;

  constructor() {
    this.DATA = data;
  }

  ngOnInit(): void {
  }

  startConv(): void{
    if (!this.isOpen){
      this.msgs = [];
    }
    else{
      this.msgs.push('En quoi puis-je vous aider UwU ?');

      /*
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
      */
    }
  }

  onSubmit(): void{
    if (this.inpstr == '/animation off'){
      data.redirection = '';
      this.msgs.push('Les animations ont été supprimés');
      this.inpstr = '';
    }
    else if (this.inpstr == '/animation on'){
      data.redirection = '/transition';
      this.msgs.push('Les animations ont été ajouté');
      this.inpstr = '';
    }
    if (this.inpstr == '/darkmode off'){
      data.darkmode = false;
      this.msgs.push('Theme light');
      this.inpstr = '';
    }
    else if (this.inpstr == '/darkmode on'){
      data.darkmode = true;
      this.msgs.push('Theme dark');
      this.inpstr = '';
    }
  }


}
