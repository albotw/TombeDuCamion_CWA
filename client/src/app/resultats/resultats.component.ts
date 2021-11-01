import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';//.prod';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.css']
})
export class ResultatsComponent implements OnInit {

  rech ="";
  products = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
		this.rech = this.route.snapshot.paramMap.get('str');
    this.products = [];
		let query = `{
			productsSearch(searchString:\"${this.rech}\"){
			p_uid
			seller
			title
			price
			stock
			description
			images
			comments
			}
		}`;
		let variables = null;
		this.http.post(environment.API+"/graphql?", JSON.stringify({ query, variables }), 
			{headers: {"Content-Type": "application/json",}, observe: "body", responseType: "json"}
			)
			.subscribe(
			(data : Array<any>) =>
			{
				data = data['data']['productsSearch'];
        for (let item of data){
          if (item['description'].length > 40){
            item['description'] = item['description'].substring(0, 37)+"...";
          }
          this.products.push(item);
        }
			});
  }


}
