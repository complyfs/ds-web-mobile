import { Component, Input, OnInit } from '@angular/core';
import { DsApplication } from '../../../objects/ds-application';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { RestService } from '../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DisplayFileCountInfo } from '../../../objects/display-file-count-info/display-file-count-info';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-bm-list-panel',
  templateUrl: './bm-list-panel.component.html',
  styleUrls: ['./bm-list-panel.component.scss']
})
export class BmListPanelComponent implements OnInit {

  @Input() bucketMonitor: any;
  bucketData: any;
  loading = false;

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: '' },
  ];

  lineChartLabels: Label[] = [];

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

    this.loading = true;
    this.restService.adminBmFileStats(params)
      .pipe( finalize( () => { this.loading = false; }))
      .subscribe( r => {
        this.bucketData = r[0];

        //console.log('bucketData', JSON.stringify(this.bucketData, null, 4));

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

  getFileSize(fileSize) {
    return DisplayFileCountInfo.getFileSize(fileSize);
  }

  getFileUnits(fileSize) {
    return DisplayFileCountInfo.getFileUnits(fileSize);
  }

}
