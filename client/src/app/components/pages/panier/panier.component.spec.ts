import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierComponent } from './panier.component';

describe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove item if stock is <= 0', () => {
    component.panier = [{count: 1}] // create item with stock 1 
    component.subItem(0);           // sub 1 stock of item at position 0
    expect(component.panier.length).toEqual(0); //  item should be removed
  });

});
