import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../../services/rest/rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DisplayFileCountInfo} from "../../../../objects/display-file-count-info/display-file-count-info";

@Component({
  selector: 'app-vb-dash-stats',
  templateUrl: './vb-dash-stats.component.html',
  styleUrls: ['./vb-dash-stats.component.scss']
})
export class VbDashStatsComponent implements OnInit {

  fileCount: number = 0;
  fileSize: number = 0;
  vbAppCount: number = 0;

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.restService.adminVbFilesSizeAndCount({ groupByLevel: 'tenant'})
      .subscribe ( r => {
        this.fileCount = r[0].fileCount;
        this.fileSize = r[0].fileSize;
      }, err => {
        this.snackMessage.open('Error loading virtual bucket file summary', 'x', {verticalPosition: 'top'});
      });

    this.restService.adminGetApplications({from: 0, size: 0})
      .subscribe ( r => {
        this.vbAppCount = r.itemsFound;
      }, err => {
        this.snackMessage.open('Error loading virtual bucket file summary', 'x', {verticalPosition: 'top'});
      });
  }

  getFileSize() {
    return DisplayFileCountInfo.getFileSize(this.fileSize);
  }

  getFileUnits() {
    return DisplayFileCountInfo.getFileUnits(this.fileSize);
  }
}
