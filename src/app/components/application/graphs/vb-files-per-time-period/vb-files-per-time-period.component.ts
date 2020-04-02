import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-vb-files-per-time-period',
  templateUrl: './vb-files-per-time-period.component.html',
  styleUrls: ['./vb-files-per-time-period.component.scss']
})
export class VbFilesPerTimePeriodComponent implements OnInit {

  @Input() applicationId;
  @Input() virtualBucketId;
  graphData: any;

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        stacked: false,
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5
        }
      }],
      xAxes: [{
        type: 'time',
        time: {
          round: 'minute',
          ticks: { source: 'data' }
        }
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

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const params: any = { period: 'minute' };
    if (this.applicationId) { params.applicationId = this.applicationId; }
    if (this.virtualBucketId) { params.virtualBucketId = this.applicationId; }

    this.restService.adminFilesPerTimePeriod(params)
      .subscribe ( r => {
        this.graphData = r;

        this.lineChartLabels = this.graphData.map( i => i._id);
        this.lineChartData = [{
          data: this.graphData.map( i => i.count),
          label: 'Per Minute'
        }];

      }, err => {
        this.snackMessage.open('Error loading Files Per Time Period', 'x', {verticalPosition: 'top'});
      });
  }

}
