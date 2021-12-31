import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NewSellComponent } from './new-sell.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('NewSellComponent', () => {
  let httpClient: HttpClient;
  let component: NewSellComponent;
  let fixture: ComponentFixture<NewSellComponent>;
  let Debug_elem: DebugElement;
  let HTML_elem: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [ NewSellComponent ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call post method', () => {
    spyOn(component, 'post');
    HTML_elem = fixture.debugElement.query(By.css('#post_btn')).nativeElement;
    HTML_elem.click();
    expect(component.post).toHaveBeenCalledTimes(1);
  });

  it('form should be invalid', () => {
    component.titleGroup.controls['title'].setValue('');
    component.descrGroup.controls['descr'].setValue('');
    component.details1.controls['stock'].setValue(0);
    component.details1.controls['price'].setValue(-158);
    component.categoryGroup.controls['category'].setValue('');
    expect(component.titleGroup.valid).toBeFalsy();
    expect(component.descrGroup.valid).toBeFalsy();
    expect(component.details1.valid).toBeFalsy();
    expect(component.categoryGroup.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.titleGroup.controls['title'].setValue('Ceci est un titre');
    component.descrGroup.controls['descr'].setValue('Ceci est une description');
    component.details1.controls['stock'].setValue(10);
    component.details1.controls['price'].setValue(840);
    component.categoryGroup.controls['category'].setValue('Jouets');
    expect(component.titleGroup.valid).toBeTruthy();
    expect(component.descrGroup.valid).toBeTruthy();
    expect(component.details1.valid).toBeTruthy();
    expect(component.categoryGroup.valid).toBeTruthy();
  });




});
