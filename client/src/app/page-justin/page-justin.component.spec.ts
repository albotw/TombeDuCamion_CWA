import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageJustinComponent } from './page-justin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


describe('PageJustinComponent', () => {
  let httpClient: HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        PageJustinComponent
      ],
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PageJustinComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
