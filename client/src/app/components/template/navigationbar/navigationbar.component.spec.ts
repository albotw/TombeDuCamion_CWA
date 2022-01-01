
import { NavigationbarComponent } from './navigationbar.component';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {OverlayModule} from '@angular/cdk/overlay';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';


describe('NavigationbarComponent', () => {
  let component: NavigationbarComponent;
  let fixture: ComponentFixture<NavigationbarComponent>;
  let HTML_elem: HTMLInputElement;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OverlayModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        NavigationbarComponent,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NavigationbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should update route',  async () => {
    
    spyOn(component, 'updateRoute');
    fixture.detectChanges();
    
    HTML_elem = fixture.debugElement.query(By.css('#src_input')).nativeElement;

    HTML_elem.value = 'pok';
    HTML_elem.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    
    expect(component.updateRoute).toHaveBeenCalledTimes(1);

  });

});
