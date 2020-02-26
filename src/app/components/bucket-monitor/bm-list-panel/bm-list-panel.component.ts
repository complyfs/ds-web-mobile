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

  @Input() application: any;
  dataBuckets: any;
  dataRates: any;


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
    const params: any = { _id: this.application._id };

    this.restService.getApplicationGraphs(params)
      .subscribe( r => {
        this.dataBuckets = r.dataBuckets;
        this.dataRates = r.dataRates;

        this.lineChartLabels = this.dataRates.map( i => i.periodStart );
        this.lineChartData[0] = { data: this.dataRates.map( i => i.docs), label: 'Docs per day' };

        this.doughnutChartLabels = this.dataBuckets.map ( i => i.name);
        this.doughnutChartData = [this.dataBuckets.map ( i => i.docs)];

      }, err => {
        this.snackMessage.open('Error loading bucket monitor graphs', 'x', {verticalPosition: 'top'});
      });

    const params2: any = { applicationId: this.application._id };

    this.restService.adminFilesPerVirtualBucketByApp(params2)
      .subscribe( r => {
        console.log(JSON.stringify(r, null, 4));
      }, err => {
        this.snackMessage.open('Error loading bucket monitor graphs', 'x', {verticalPosition: 'top'});
      });

    const params3: any = { applicationId: this.application._id };

    this.restService.adminFilesPerTimePeriodPerApp(params3)
      .subscribe( r => {
        console.log(JSON.stringify(r, null, 4));
      }, err => {
        this.snackMessage.open('Error loading bucket monitor graphs', 'x', {verticalPosition: 'top'});
      });
  }

}
