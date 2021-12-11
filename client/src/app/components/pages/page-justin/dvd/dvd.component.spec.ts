import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DvdComponent } from './dvd.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';


describe('DvdComponent', () => {
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
        DvdComponent
      ],
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
    matDialog  = TestBed.get(MatDialog)
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DvdComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
