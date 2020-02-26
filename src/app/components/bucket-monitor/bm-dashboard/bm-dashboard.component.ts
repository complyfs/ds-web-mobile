import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bm-dashboard',
  templateUrl: './bm-dashboard.component.html',
  styleUrls: ['./bm-dashboard.component.scss']
})
export class BmDashboardComponent implements OnInit {

  fileNumber: number = 1000000000;


  constructor() { }

  ngOnInit(): void {
  }



}
