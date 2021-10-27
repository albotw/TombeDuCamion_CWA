import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WassimComponent } from './wassim.component';

describe('WassimComponent', () => {
  let component: WassimComponent;
  let fixture: ComponentFixture<WassimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WassimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WassimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
