import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DetailProduitComponent, BottomNewCommSheet } from './detail-produit.component';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';


describe('DetailProduitComponent', () => {
  let httpClient: HttpClient;
  let component: DetailProduitComponent;
  let fixture: ComponentFixture<DetailProduitComponent>;
  let componentComm: BottomNewCommSheet;
  let fixtureComm: ComponentFixture<BottomNewCommSheet>;
  let Debug_elem: DebugElement;
  let HTML_elem: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatBottomSheetModule
      ],
      declarations: [
        DetailProduitComponent
      ],
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixtureComm = TestBed.createComponent(BottomNewCommSheet);
    componentComm = fixtureComm.componentInstance;
    fixtureComm.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it("shouldn't add products if the stock is 0", () => {
		component.product = {
        stock: 0
    }
    component.product.stock = 0;
    expect(component.addToPanier()).toEqual(false);
  });

  it("sould call post method", () => {
    spyOn(componentComm, 'post');
    HTML_elem = fixtureComm.debugElement.query(By.css('#post_btn')).nativeElement;
    HTML_elem.click();
    expect(componentComm.post).toHaveBeenCalledTimes(1);
  });

  it("commentary sould be invalid", () => {
    componentComm.commentaryGroup.controls['commentary'].setValue('');
    expect(componentComm.commentaryGroup.valid).toBeFalsy();
  });

});
