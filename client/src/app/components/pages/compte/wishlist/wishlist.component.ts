import { Component, OnInit } from '@angular/core';
import { CacheData } from '../../../../shared/cache';
import Cache from "../../../../shared/cache";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist: any;

  constructor() { }

  ngOnInit(): void {
    this.wishlist = Cache.get(CacheData.Wishlist);
  }

}
