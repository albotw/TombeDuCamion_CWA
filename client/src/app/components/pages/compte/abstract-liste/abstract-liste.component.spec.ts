import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractListeComponent } from './abstract-liste.component';

describe('AbstractListeComponent', () => {
  let component: AbstractListeComponent;
  let fixture: ComponentFixture<AbstractListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbstractListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
