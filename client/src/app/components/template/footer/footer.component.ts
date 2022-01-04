import { Component, OnInit } from '@angular/core';
import {data} from "../../../shared/global";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

	darkmode = false;
  constructor() { }

  ngOnInit(): void {
  }

   toggleDarkMode() {
		data.darkmode = !data.darkmode;
	}
}
