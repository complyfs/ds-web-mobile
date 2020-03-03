import { Component, OnInit } from '@angular/core';
import {Label, MultiDataSet} from "ng2-charts";
import {ChartType} from "chart.js";
import {RestService} from "../../../../services/rest/rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-vb-files-per-provider',
  templateUrl: './vb-files-per-provider.component.html',
  styleUrls: ['./vb-files-per-provider.component.scss']
})
export class VbFilesPerProviderComponent implements OnInit {

  apps: any[];
  graphData: any;

  doughnutChartLabels: Label[] = null; // ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = null; // [
  // [55, 25, 20]
  // ];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartLegend = true;
  doughnutChartOptions = {
    legend: {position: 'right'}
  };


  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const params: any = {  }; // only param is tenantId, added on server

    // Now we can get the stats
    this.restService.adminVbProviderSizeAndCount(params)
      .subscribe( r => {
        this.graphData = r.sort( (a, b) => b.fileCount - a.fileCount);

        this.doughnutChartLabels = this.graphData.map ( i => i._id);

        this.doughnutChartData = [this.graphData.map ( i => i.fileCount)];

      }, err => {
        this.snackMessage.open('Error loading provider file count graph', 'x', {verticalPosition: 'top'});
      });

  }

}
