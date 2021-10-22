import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageJustinComponent } from './page-justin.component';

describe('PageJustinComponent', () => {
  let component: PageJustinComponent;
  let fixture: ComponentFixture<PageJustinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageJustinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageJustinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
