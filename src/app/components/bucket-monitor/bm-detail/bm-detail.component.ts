import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../../../environments/environment';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-bm-detail',
  templateUrl: './bm-detail.component.html',
  styleUrls: ['./bm-detail.component.scss']
})
export class BmDetailComponent implements OnInit {

  @Input() bucketMonitorId: string;
  bucketMonitor: any;

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.bucketMonitorId = params.bucketMonitorId;

        this.loadData();
      });
  }

  loadData() {
    this.restService.adminGetBucketMonitor({bucketMonitorId: this.bucketMonitorId})
      .subscribe( r => {
        this.bucketMonitor = r;
      }, err => {
        this.snackMessage.open('Error listing bucket monitor detail', 'x', {verticalPosition: 'top'});
      });
  }

  startInventoryBucket() {
    this.restService.adminBmInventoryBucket({bucketMonitorId: this.bucketMonitorId})
      .subscribe( r => {
        this.snackMessage.open('Inventory of the bucket started', null, {duration: environment.snackBarDuration, verticalPosition: 'bottom'});
      }, err => {
        this.snackMessage.open('Error starting bucket inventory', 'x', {verticalPosition: 'top'});
      });
  }

  deleteBucketMonitor() {
    this.restService.adminBmDeleteBucketMonitor({bucketMonitorId: this.bucketMonitorId})
      .subscribe( r => {
        this.snackMessage.open('Deletion of the bucket monitor started', null, {duration: environment.snackBarDuration, verticalPosition: 'bottom'});
      }, err => {
        this.snackMessage.open('Error deleting bucket monitor', 'x', {verticalPosition: 'top'});
      });
  }
}
