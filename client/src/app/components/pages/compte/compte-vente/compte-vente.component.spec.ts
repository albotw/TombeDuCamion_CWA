import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteVenteComponent } from './compte-vente.component';

describe('CompteVenteComponent', () => {
  let component: CompteVenteComponent;
  let fixture: ComponentFixture<CompteVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteVenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
