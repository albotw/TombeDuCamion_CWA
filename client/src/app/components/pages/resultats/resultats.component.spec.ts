import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ResultatsComponent } from './resultats.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';


describe('ResultatsComponent', () => {
  let httpClient: HttpClient;
  let router: Router;
  const routes: Routes = [
    { path: 'recherche/:str', component: ResultatsComponent },
    ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      declarations: [
        ResultatsComponent
      ],
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ResultatsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should give result with stock > 0', () => {
    const fixture = TestBed.createComponent(ResultatsComponent);
    const app = fixture.componentInstance;

    router = TestBed.inject(Router);

    router.createUrlTree(['recherche', 'poke']);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      for (let product of app.products){
        expect(product['stock']).toBeGreaterThanOrEqual(1);
      }
    });
    
  });

});
