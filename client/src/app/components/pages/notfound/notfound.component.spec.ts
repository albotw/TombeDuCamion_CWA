import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfoundComponent } from './notfound.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


describe('NotfoundComponent', () => {
  let httpClient: HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        NotfoundComponent
      ],
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NotfoundComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});

