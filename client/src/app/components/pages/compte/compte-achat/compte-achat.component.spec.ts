import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteAchatComponent } from './compte-achat.component';

describe('CompteAchatComponent', () => {
  let component: CompteAchatComponent;
  let fixture: ComponentFixture<CompteAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteAchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
