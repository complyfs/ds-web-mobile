import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { RestService } from '../../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-bm-file-number-per-tenant',
  templateUrl: './bm-file-number-per-tenant.component.html',
  styleUrls: ['./bm-file-number-per-tenant.component.scss']
})
export class BmFileNumberPerTenantComponent implements OnInit {

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
    const params: any = {  }; // only param is tenantId, added on server

    this.restService.adminBmFileStats(params)
      .subscribe( r => {
        this.graphData = r.sort( (a, b) => b.fileCount - a.fileCount);

        this.doughnutChartLabels = this.graphData.map ( i => i._id.providerBucket);
        this.doughnutChartData = [this.graphData.map ( i => i.fileCount)];

        this.pageIndex = 0;

        this.itemsFound = this.graphData.length;

      }, err => {
        this.snackMessage.open('Error loading file count graph', 'x', {verticalPosition: 'top'});
      });

  }

  getPagedBuckets() {
    return this.graphData.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
