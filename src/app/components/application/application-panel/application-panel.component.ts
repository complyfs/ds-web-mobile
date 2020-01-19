import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, MultiDataSet, Label } from 'ng2-charts';
import { Application } from '../../../objects/application';

@Component({
  selector: 'app-application-panel',
  templateUrl: './application-panel.component.html',
  styleUrls: ['./application-panel.component.scss']
})
export class ApplicationPanelComponent implements OnInit {

  @Input() application: Application;
  dataBuckets: any;
  dataRates: any;


  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

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

        this.lineChartLabels = this.dataRates.map( r => new Date(r.periodStart));
        this.lineChartData[0] = { data: this.dataRates.map( r => r.docs), label: 'Docs per day' };

        this.doughnutChartLabels = this.dataBuckets.map ( r => r.name);
        this.doughnutChartData = [this.dataBuckets.map ( r => r.docs)];

      }, err => {
        this.snackMessage.open('Error loading application graphs', 'x', {verticalPosition: 'top'});
      });
  }

}
