import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';


describe('PopupComponent', () => {
  let httpClient: HttpClient;
  let matDialog: MatDialog;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [
        PopupComponent
      ],
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
    matDialog  = TestBed.get(MatDialog)
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PopupComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
