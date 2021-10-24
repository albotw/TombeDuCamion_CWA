import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'navbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit
{

  panierOuvert = false;
  constructor() { }

  ngOnInit(): void {
  }

}
