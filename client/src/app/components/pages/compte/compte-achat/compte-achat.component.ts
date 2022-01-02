import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-compte-achat',
  templateUrl: './compte-achat.component.html',
  styleUrls: ['./compte-achat.component.css']
})
export class CompteAchatComponent implements OnInit {
  displayedColumns: string[] = ['p_uid'];
  dataSource: string[] = [
    "1",
    "2"
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

export interface Objet {
  p_uid: string;
}

const ELEMENT_DATA: Objet[] = [
  {p_uid: '1'},
  {p_uid: '2'},
]