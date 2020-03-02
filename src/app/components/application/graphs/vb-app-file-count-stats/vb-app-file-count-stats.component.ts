import { Component, OnInit } from '@angular/core';
import {Label, MultiDataSet} from "ng2-charts";
import {ChartType} from "chart.js";
import {RestService} from "../../../../services/rest/rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-vb-app-file-count-stats',
  templateUrl: './vb-app-file-count-stats.component.html',
  styleUrls: ['./vb-app-file-count-stats.component.scss']
})
export class VbAppFileCountStatsComponent implements OnInit {

  apps: any[];
  graphData: any;

  doughnutChartLabels: Label[] = null; // ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = null; // [
  // [55, 25, 20]
  // ];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartLegend = false;

  itemsFound = 0;
  pageSize = 3;
  pageIndex = 0;
  pageSizeOptions: number [] = [3, 5, 10];

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const params: any = { groupByLevel: 'application' }; // only param is tenantId, added on server

    // Get list of apps so that we can have the application name when we get stats
    this.restService.adminGetApplications({ from: 0, size: 1000 })
      .subscribe( apps => {
        this.apps = apps.hits;

        // Now we can get the stats
        this.restService.adminVbFilesSizeAndCount(params)
          .subscribe( r => {
            this.graphData = r.sort( (a, b) => b.fileCount - a.fileCount);

            this.doughnutChartLabels = this.graphData.map ( i => {
              return this.getBucketName(i._id);
            });
            this.doughnutChartData = [this.graphData.map ( i => i.fileCount)];

            this.pageIndex = 0;

            this.itemsFound = this.graphData.length;

          }, err => {
            this.snackMessage.open('Error loading file count graph', 'x', {verticalPosition: 'top'});
          });

      }, err => {
        this.snackMessage.open('Error loading apps', 'x', {verticalPosition: 'top'});
      });

  }

  getPagedApps() {
    return this.graphData.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getBucketName(id) {
    const matchApps = this.apps.filter( a => a._id === id);
    return matchApps[0].name;
  }

}
