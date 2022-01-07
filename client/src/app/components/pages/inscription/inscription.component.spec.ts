import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { InscriptionComponent } from './inscription.component';
import {OverlayModule} from "@angular/cdk/overlay";
import {MatSnackBar} from "@angular/material/snack-bar";

describe('InscriptionComponent', () => {
  let component: InscriptionComponent;
  let fixture: ComponentFixture<InscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        OverlayModule,
      ],
      declarations: [ InscriptionComponent ],
      providers: [MatSnackBar],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
