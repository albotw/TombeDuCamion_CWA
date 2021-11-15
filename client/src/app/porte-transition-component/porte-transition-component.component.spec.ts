import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorteTransitionComponentComponent } from './porte-transition-component.component';

describe('PorteTransitionComponentComponent', () => {
  let component: PorteTransitionComponentComponent;
  let fixture: ComponentFixture<PorteTransitionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorteTransitionComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorteTransitionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
