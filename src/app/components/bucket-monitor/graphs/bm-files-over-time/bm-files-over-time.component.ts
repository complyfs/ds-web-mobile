import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { RestService } from '../../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-bm-files-over-time',
  templateUrl: './bm-files-over-time.component.html',
  styleUrls: ['./bm-files-over-time.component.scss']
})
export class BmFilesOverTimeComponent implements OnInit {

  @Input() fileCountOrSize: string;
  @Input() bucketMonitor: any;

  graphData: any;

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['2019-04-01', '2019-09-01', '2019-10-01', '2019-11-01', '2019-12-01', '2020-01-01'];

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
      borderColor: 'blue',
      //backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';

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
    const params: any = { providerBucket: this.bucketMonitor.providerBucket }; // only param is tenantId, added on server

    this.restService.adminBmFilesOverTime(params)
      .subscribe( r => {
        this.graphData = r;

        this.lineChartLabels = this.graphData.map( i => i._id);
        this.lineChartData = [{
          data: this.graphData.map( i => i[this.fileCountOrSize]),
          label: this.fileCountOrSize === 'fileCount' ? 'File Count' : 'Files Size'
        }];

      }, err => {
        this.snackMessage.open('Error loading file aging data', 'x', {verticalPosition: 'top'});
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
