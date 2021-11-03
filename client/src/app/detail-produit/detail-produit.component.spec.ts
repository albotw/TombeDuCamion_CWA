import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DetailProduitComponent } from './detail-produit.component';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


describe('DetailProduitComponent', () => {
  let httpClient: HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        DetailProduitComponent
      ],
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DetailProduitComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
