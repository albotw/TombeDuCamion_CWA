import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestApiComponent } from './test-api.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('TestApiComponent', () =>
{
	let component: TestApiComponent;
	let fixture: ComponentFixture<TestApiComponent>;

	beforeEach(async () =>
	{
		await TestBed.configureTestingModule({
			declarations: [TestApiComponent],
			imports: [HttpClientTestingModule]
		})
			.compileComponents();
	});

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(TestApiComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the app', () =>
	{
		expect(component).toBeTruthy();
	});
});
