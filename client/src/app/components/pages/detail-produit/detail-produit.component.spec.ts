import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DetailProduitComponent } from './detail-produit.component';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';


describe('DetailProduitComponent', () => {
  let httpClient: HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatBottomSheetModule
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

  it("shouldn't add products if the stock is 0", () => {

    const fixture = TestBed.createComponent(DetailProduitComponent);
    const app = fixture.componentInstance;
    
		app.product = {
        stock: 0
    }
    app.product.stock = 0;
    expect(app.addToPanier()).toEqual(false);

  });

});
