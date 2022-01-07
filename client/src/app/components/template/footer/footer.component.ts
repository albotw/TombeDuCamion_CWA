import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import {data} from "../../../shared/global";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	darkmode = false;
  constructor() { }

  ngOnInit(): void {
  }
}
