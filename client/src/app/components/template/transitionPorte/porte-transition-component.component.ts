import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-porte-transition-component',
  templateUrl: './porte-transition-component.component.html',
  styleUrls: ['./porte-transition-component.component.css']
})
export class PorteTransitionComponentComponent implements OnInit {

  @Input() toRoute = ''

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    setTimeout( () => {
      console.log("test", this.route);
      const id = this.route.snapshot.paramMap.get('id');
      const opt = this.route.snapshot.paramMap.get('opt');
      if (opt !== null){
        this.router.navigate(['/'+id+'/'+opt], { queryParamsHandling: 'preserve' });
      }
      else{
        this.router.navigate(['/'+id], { queryParamsHandling: 'preserve' });
      }
    }, 1200);
  }

}
