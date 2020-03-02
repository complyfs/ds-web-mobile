import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../../services/rest/rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-vb-dash-stats',
  templateUrl: './vb-dash-stats.component.html',
  styleUrls: ['./vb-dash-stats.component.scss']
})
export class VbDashStatsComponent implements OnInit {
  kb = 1024;
  mb = this.kb * 1024;
  gb = this.mb * 1024;
  tb = this.gb * 1024;

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
    if (this.fileSize < this.mb) {
      return this.fileSize;
    } else if (this.fileSize < this.gb) {
      return this.fileSize / this.mb;
    } else if (this.fileSize < this.tb) {
      return this.fileSize / this.gb;
    } else {
      return this.fileSize / this.tb;
    }
  }

  getFileUnits() {
    if (this.fileSize < this.kb) {
      return 'BYTES';
    } else if (this.fileSize < this.mb) {
      return 'KILOBYTES';
    } else if (this.fileSize < this.gb) {
      return 'MB';
    } else if (this.fileSize < this.tb) {
      return 'GB';
    } else {
      return 'TB';
    }
  }
}
