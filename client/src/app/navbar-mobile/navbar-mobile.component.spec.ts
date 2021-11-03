import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavbarMobileComponent } from './navbar-mobile.component';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {OverlayModule} from '@angular/cdk/overlay';


describe('NavbarMobileComponent', () => {
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
        NavbarMobileComponent
      ],
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
    overlayModule = TestBed.get(OverlayModule);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NavbarMobileComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
