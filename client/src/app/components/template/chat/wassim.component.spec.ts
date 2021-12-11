import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WassimComponent } from './wassim.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {OverlayModule} from '@angular/cdk/overlay';

describe('WassimComponent', () => {
  let httpClient: HttpClient;
  let overlayModule: OverlayModule;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        OverlayModule
      ],
      declarations: [
        WassimComponent
      ],
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
    overlayModule = TestBed.get(OverlayModule);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(WassimComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
