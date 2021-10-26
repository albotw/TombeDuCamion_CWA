import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilMobileComponent } from './accueil-mobile.component';

describe('AccueilMobileComponent', () => {
  let component: AccueilMobileComponent;
  let fixture: ComponentFixture<AccueilMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
