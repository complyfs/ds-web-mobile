import { Component, Input, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { RestService } from '../../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vb-files-per-vb',
  templateUrl: './vb-files-per-vb.component.html',
  styleUrls: ['./vb-files-per-vb.component.scss']
})
export class VbFilesPerVbComponent implements OnInit {

  apps: any[];
  graphData: any;
  @Input() applicationId;

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
    if ( this.applicationId ) { params.applicationId = this.applicationId; }

    // Now we can get the stats
    this.restService.adminVbSizeAndCount(params)
      .subscribe( r => {
        this.graphData = r.sort( (a, b) => b.fileCount - a.fileCount);

        this.doughnutChartLabels = this.graphData.map ( i => i._id);

        this.doughnutChartData = [this.graphData.map ( i => i.fileCount)];

      }, err => {
        this.snackMessage.open('Error loading virtual bucket file count graph', 'x', {verticalPosition: 'top'});
      });

  }

}
