import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { Chart, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ChartjsUtilities } from '../../../../objects/chartjs-utilities/chartjs-utilities';
import { DisplayFileCountInfo } from '../../../../objects/display-file-count-info/display-file-count-info';
import { RestService } from '../../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bm-history-max-per-time-per-bucket-monitor',
  templateUrl: './bm-history-max-per-time-per-bucket-monitor.component.html',
  styleUrls: ['./bm-history-max-per-time-per-bucket-monitor.component.scss']
})
export class BmHistoryMaxPerTimePerBucketMonitorComponent implements OnInit, AfterViewInit {

  @Input() fileCountOrSize: string;
  @Input() bucketMonitorId: string;

  @ViewChild('chartCanvas', { static: true }) chartCanvas: Chart;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  graphData: any;
  fileDisplayInfo: any;

  public colors = ChartjsUtilities.getColors();
  public chartLabels: Label[] = [];
  public chartColors: Array<any> = [{}]; // any[] = ['blue', 'yellow', 'red', 'green'];
  public chartData: number[] = [];
  public chartType: ChartType = 'bar';
  public barChartLabels: any = [];

  public chartDatasets: any[] = [
    {
      data: [{x: '2020-05-01', y: 100}],
      label: 'original label',
      borderColor: 'grey',
      backgroundColor: 'blue',
      hoverBackgroundColor: 'blue'
    }
  ];

  public chartOptions: ChartOptions = {

    responsive: true,
    maintainAspectRatio: false,

        title: {
          display: false,
          text: '',
          position: 'bottom',
          padding: 0
        },
        legend: {
          display: true,
          position: 'right'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: 'test label'
            }
          }],
          xAxes: [
            {
              stacked: true,
              offset: true,
              type: 'time',
              time: {
                unit: 'day',
                round: 'day',
                displayFormats: {
                  day: 'DD/MM'
                },
                tooltipFormat: 'DD/MM'
              }
            }
          ]
        },
        plugins: {
          // Change options for ALL labels of THIS CHART
          datalabels: {
            display: false
          }
        }
  };

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
    const params: any = {
      period: 'day',
      startDate: new Date('2020-01-01'),
      endDate: new Date(),
      groupByBucketMonitor: true
    }; // only param is tenantId, added on server

    if (this.bucketMonitorId) { params.bucketMonitorId = this.bucketMonitorId; }

    this.restService.adminBmHistoryMaxPerTime(params)
      .subscribe( r => {
        this.graphData = r;

        const maxStorageSize = this.graphData.reduce((max, item) => {
          return item.size > max ? item.size : max;
        }, 0);

        this.fileDisplayInfo = DisplayFileCountInfo.fileSizeToDisplay(maxStorageSize);

        this.barChartLabels = [];
        this.graphData.forEach( i => {
          const newDate = new Date(i._id.dateFromParts.year, i._id.dateFromParts.month - 1, i._id.dateFromParts.day);

          const existingDate = this.barChartLabels.findIndex( d => {
            return d.getTime() === newDate.getTime();
          } );

          if (existingDate === -1) {
            this.barChartLabels.push(newDate);
          }
        });

        // console.log( JSON.stringify( this.graphData, null, 4));
        const arys1 = {};
        const arys2 = {};

        for (const data of this.graphData) {
          if (!(data._id.providerBucket in arys1 )) {
            arys1[data._id.providerBucket] = [];
          }
          arys1[data._id.providerBucket].push({
            date: new Date(data._id.dateFromParts.year, data._id.dateFromParts.month - 1, data._id.dateFromParts.day ),
            fileCount: data.fileCount,
            size: data.size
          })
        }

        Object.keys(arys1).forEach( ( key, index) => {
          arys2[key] = [];
        });

        for (let i = 0; i < this.barChartLabels.length; i++ ) {
          const d = this.barChartLabels[i];
          Object.keys(arys1).forEach( (key, index) => {
            const f = arys1[key].filter( i => {
              const eq = (i.date.getTime() === d.getTime());
              return eq;
            });

            if (f.length === 0) {
              arys2[key].push(0);
            }
            else {
              arys2[key].push(f[0][this.fileCountOrSize]);
            }
          });
        }


        this.chartDatasets = [];
        Object.keys(arys2).forEach(( key, index ) => {
          // key: the name of the object key
          // index: the ordinal position of the key within the object
          const color = this.colors[index];

          const lab = key;
          // if (this.graph_type === 'call_content_type_counts') {
          //  lab = this.getCallTypeDisplayFromId(key, 'it');
          // }

          const series = {
            data: arys2[key],
            label: lab,
            borderColor: color.borderColor,
            backgroundColor: color.backgroundColor,
            hoverBackgroundColor: color.hoverBackgroundColor
          };

          this.chartDatasets.push(series);

        });

        this.chartOptions.scales.yAxes[0].scaleLabel.labelString = (this.fileCountOrSize === 'fileCount') ? 'Number of Files' : 'Storage Size';
        this.chart.ngOnChanges({});

      }, err => {
        this.snackMessage.open('Error loading file aging data', 'x', {verticalPosition: 'top'});
      });
  }

  refreshGraph() {
    this.chart.ngOnChanges({});
  }

}
