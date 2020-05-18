import { Component, Input, OnInit } from '@angular/core';
import { DecimalPipe, formatNumber } from '@angular/common';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { RestService } from '../../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { DisplayFileCountInfo } from '../../../../objects/display-file-count-info/display-file-count-info';

@Component({
  selector: 'app-bm-history-max-per-time',
  templateUrl: './bm-history-max-per-time.component.html',
  styleUrls: ['./bm-history-max-per-time.component.scss']
})
export class BmHistoryMaxPerTimeComponent implements OnInit {

  @Input() fileCountOrSize: string;
  @Input() bucketMonitorId: string;

  graphData: any;

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['2019-04-01', '2019-09-01', '2019-10-01', '2019-11-01', '2019-12-01', '2020-01-01'];

  lineChartOptions: any = {
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
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          let label = data.datasets[tooltipItem.datasetIndex].label || '';

          if (label) {
            label += ': ';
          }
          if (this.fileCountOrSize === 'size') {
            label += Math.round(tooltipItem.yLabel * 100) / 100;
            label += ' ' + (this.fileDisplayInfo ? this.fileDisplayInfo.units : '');
          }
          else if (this.fileCountOrSize === 'fileCount') {
            label += formatNumber(tooltipItem.yLabel, 'en-US', '1.0-0');
          }

          return label;
        }
      }
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'blue',
      // backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';

  itemsFound = 0;
  pageSize = 3;
  pageIndex = 0;
  pageSizeOptions: number [] = [3, 5, 10];

  fileDisplayInfo: any;

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const params: any = {
      period: 'day',
      startDate: new Date('2020-01-01'),
      endDate: new Date()
    }; // only param is tenantId, added on server

    if (this.bucketMonitorId) { params.bucketMonitorId = this.bucketMonitorId; }

    this.restService.adminBmHistoryMaxPerTime(params)
      .subscribe( r => {
        this.graphData = r;

        const maxStorageSize = this.graphData.reduce((max, item) => {
          return item.size > max ? item.size : max;
        }, 0);

        this.fileDisplayInfo = DisplayFileCountInfo.fileSizeToDisplay(maxStorageSize);

        this.lineChartLabels = this.graphData.map( i =>
          new Date(i._id.dateFromParts.year, i._id.dateFromParts.month - 1, i._id.dateFromParts.day ));

        this.lineChartData = [{
          data: this.graphData.map( i => {
            if (this.fileCountOrSize === 'fileCount') {
              return i[this.fileCountOrSize];
            } else if (this.fileCountOrSize === 'size') {
              return i[this.fileCountOrSize] / this.fileDisplayInfo.divisor;
            }
          }),
          label: this.fileCountOrSize === 'fileCount' ? 'File Count' : 'Storage Size'
        }];

        if (this.fileCountOrSize === 'size') {
          this.lineChartOptions.scales.yAxes[0].scaleLabel = {
            labelString: this.fileDisplayInfo.units,
            display: true
          };
        }

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
