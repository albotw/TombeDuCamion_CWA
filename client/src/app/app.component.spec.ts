import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccueilComponent } from './components/pages/accueil/accueil.component';
import { AppComponent } from './app.component';
import { DetailProduitComponent } from './components/pages/detail-produit/detail-produit.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let httpClient: HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        AccueilComponent,
        DetailProduitComponent
      ],
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
