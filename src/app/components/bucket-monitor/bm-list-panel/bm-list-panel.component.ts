import {Component, Input, OnInit} from '@angular/core';
import {DsApplication} from "../../../objects/ds-application";
import {ChartDataSets, ChartType} from "chart.js";
import {Color, Label, MultiDataSet} from "ng2-charts";
import {RestService} from "../../../services/rest/rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-bm-list-panel',
  templateUrl: './bm-list-panel.component.html',
  styleUrls: ['./bm-list-panel.component.scss']
})
export class BmListPanelComponent implements OnInit {

  @Input() bucketMonitor: any;
  bucketData: any;

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['2019-08-01', '2019-09-01', '2019-10-01', '2019-11-01', '2019-12-01', '2020-01-01'];

  lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        stacked: false,
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 1
        }
      }],
      xAxes: [{
        type: 'time'
      }]
    },
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';

  doughnutChartLabels: Label[] = null; // ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = null; // [
  // [55, 25, 20]
  // ];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartLegend = false;

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const params: any = { bucketMonitorId: this.bucketMonitor._id }; // only param is tenantId, added on server

    this.restService.adminBmFileStats(params)
      .subscribe( r => {
        this.bucketData = r[0];

        /*
        this.doughnutChartLabels = this.graphData.map ( i => i._id.providerBucket);
        this.doughnutChartData = [this.graphData.map ( i => i.size)];

        this.pageIndex = 0;

        this.itemsFound = this.graphData.length;


         */
      }, err => {
        this.snackMessage.open('Error loading bucket monitor size data', 'x', {verticalPosition: 'top'});
      });

  }

}
