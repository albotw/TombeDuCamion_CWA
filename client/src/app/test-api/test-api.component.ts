import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "./../../environments/environment.prod";

@Component({
	selector: 'app-test-api',
	templateUrl: './test-api.component.html',
	styleUrls: ['./test-api.component.css']
})

@Injectable()
export class TestApiComponent implements OnInit
{
	public product: any = {};
	constructor(private http: HttpClient)
	{
		this.http.get("/api/products", { observe: "body", responseType: "json" })
			.subscribe(
				(data) =>
				{
					console.log(data);
					this.product = data[0];
				})

	}

	ngOnInit(): void
	{
	}

}
