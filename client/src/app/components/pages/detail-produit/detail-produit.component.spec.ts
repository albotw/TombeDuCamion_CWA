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
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';


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
        MatBottomSheetModule,
        BrowserDynamicTestingModule
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


});
