import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {

	public product: any = {};

  public p_uid: number = -1;

  
	constructor(private http: HttpClient, private route:ActivatedRoute)
	{
    this.p_uid = Number(this.route.snapshot.paramMap.get('bank'));
		this.http.get("/api/products", { observe: "body", responseType: "json" })
			.subscribe(
				(data) =>
				{
					console.log(data);
					this.product = data[this.p_uid];
				})
	}

  ngOnInit(): void {
  }

}
