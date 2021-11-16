import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-porte-transition-component',
  templateUrl: './porte-transition-component.component.html',
  styleUrls: ['./porte-transition-component.component.css']
})
export class PorteTransitionComponentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    setTimeout( () => {
      console.log("test", this.route);
      const heroId = this.route.snapshot.paramMap.get('id');
      this.router.navigate(['/produit/'+heroId]);
    }, 1200);
  }

}
