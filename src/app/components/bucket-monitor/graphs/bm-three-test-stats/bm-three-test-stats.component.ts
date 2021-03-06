import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DisplayFileCountInfo } from '../../../../objects/display-file-count-info/display-file-count-info';

@Component({
  selector: 'app-bm-three-test-stats',
  templateUrl: './bm-three-test-stats.component.html',
  styleUrls: ['./bm-three-test-stats.component.scss']
})
export class BmThreeTestStatsComponent implements OnInit {

  fileCount: number = 0;
  fileSize: number = 0;
  bucketsCount: number = 0;

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.restService.adminBmTenantSummary({})
      .subscribe ( r => {
        this.fileCount = r[0].fileCount;
        this.fileSize = r[0].fileSize;
      }, err => {
        this.snackMessage.open('Error loading tenant summary', 'x', {verticalPosition: 'top'});
      });

    // all we are about is total itemsFound
    const params: any = { from: (0), size: 5 };
    this.restService.adminGetBucketMonitors(params)
      .subscribe (r => {
        this.bucketsCount = r.itemsFound;
      }, err => {
        this.snackMessage.open('Error listing bucket monitors', 'x', {verticalPosition: 'top'});
      });
  }

  getFileSize() {
    return DisplayFileCountInfo.getFileSize(this.fileSize);
  }

  getFileUnits() {
    return DisplayFileCountInfo.getFileUnits(this.fileSize);
  }

}
