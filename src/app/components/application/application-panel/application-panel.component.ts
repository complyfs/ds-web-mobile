import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, MultiDataSet, Label } from 'ng2-charts';
import { DsApplication } from '../../../objects/ds-application';
import {DisplayFileCountInfo} from "../../../objects/display-file-count-info/display-file-count-info";
import {VirtualBucket} from "../../../objects/virtual-bucket";

@Component({
  selector: 'app-application-panel',
  templateUrl: './application-panel.component.html',
  styleUrls: ['./application-panel.component.scss']
})
export class ApplicationPanelComponent implements OnInit {

  @Input() application: DsApplication;
  dataBuckets: any;
  dataRates: any;
  vbFilesSizeAndCount: any;
  virtualBuckets: VirtualBucket[];
  graphData:any;

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
        console.log('r', JSON.stringify(r, null, 4));

        //this.dataBuckets = r.dataBuckets;
        // this.dataRates = r.dataRates;

        //this.lineChartLabels = this.dataRates.map( i => i.periodStart );
        //this.lineChartData[0] = { data: this.dataRates.map( i => i.docs), label: 'Docs per day' };

        //this.doughnutChartLabels = this.dataBuckets.map ( i => i.name);
        //this.doughnutChartData = [this.dataBuckets.map ( i => i.docs)];

      }, err => {
        this.snackMessage.open('Error loading application graphs', 'x', {verticalPosition: 'top'});
      });

    const params2: any = { groupByLevel: 'application', applicationId: this.application._id };

    this.restService.adminVbFilesSizeAndCount(params2)
      .subscribe( r => {
        this.vbFilesSizeAndCount = r[0];
      }, err => {
        this.snackMessage.open('Error loading application graphs', 'x', {verticalPosition: 'top'});
      });

    const params3: any = { applicationId: this.application._id };

    this.restService.adminFilesPerTimePeriod(params3)
      .subscribe( r => {
        console.log('adminFilesPerTimePeriod');
        console.log(JSON.stringify(r, null, 4));

        this.dataRates = r;
        this.lineChartLabels = this.dataRates.map( i => new Date(i._id) );
        this.lineChartData[0] = { data: this.dataRates.map( i => i.count), label: 'Docs per day' };
      }, err => {
        this.snackMessage.open('Error loading application graphs', 'x', {verticalPosition: 'top'});
      });

    this.restService.adminGetVirtualBuckets(params3)
      .subscribe( r => {
        this.virtualBuckets = r.hits;

        // Now we can get the stats
        this.restService.adminVbSizeAndCount(params3)
          .subscribe( r => {
            this.graphData = r.sort( (a, b) => b.fileCount - a.fileCount);

            this.doughnutChartLabels = this.graphData.map ( i => {
              const vbs = this.virtualBuckets.filter(vb => vb._id === i._id);
              return vbs[0].virtualBucketName
            });

            this.doughnutChartData = [this.graphData.map ( i => i.fileCount)];

          }, err => {
            this.snackMessage.open('Error loading virtual bucket file count graph', 'x', {verticalPosition: 'top'});
          });

      }, err => {
        this.snackMessage.open('Error loading application graphs', 'x', {verticalPosition: 'top'});
      });



  }

  getFileSize() {
    return DisplayFileCountInfo.getFileSize(this.vbFilesSizeAndCount.fileSize);
  }

  getFileUnits() {
    return DisplayFileCountInfo.getFileUnits(this.vbFilesSizeAndCount.fileSize);
  }

}
