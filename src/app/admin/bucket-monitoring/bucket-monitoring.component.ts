import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RestService } from '../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { DsApplication } from '../../objects/ds-application';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bucket-monitoring',
  templateUrl: './bucket-monitoring.component.html',
  styleUrls: ['./bucket-monitoring.component.scss']
})
export class BucketMonitoringComponent implements OnInit {

  buckets: any;

  itemsFound = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number [] = [5, 10, 25];

  bucketMonitors: any[];
  selected: DsApplication;

  pCCredentials: any[];
  pCItemsFound: number;
  loadingBuckets = false;

  selectedProviderCredential: any;

  newBuckets = {
    name: ''
  };

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.loadProviderCredentials();
    this.loadData();
  }

  loadData() {
    const params: any = { from: (this.pageIndex * this.pageSize), size: this.pageSize };
    this.restService.adminGetBucketMonitors(params)
      .subscribe (r => {
        this.bucketMonitors = r.hits;
        this.itemsFound = r.itemsFound;
      }, err => {
        this.snackMessage.open('Error listing bucket monitors', 'x', {verticalPosition: 'top'});
      });
  }

  loadBucketList() {
    if (!this.selectedProviderCredential) { return; }
    this.loadingBuckets = true;

    this.restService.adminListBuckets({providerCredentialId: this.selectedProviderCredential._id})
      .pipe( finalize(() => { this.loadingBuckets = false; }) )
      .subscribe (r => {
        this.buckets = r;
      }, err => {
        this.snackMessage.open('Error listing buckets', 'x', {verticalPosition: 'top'});
      });
  }

  loadProviderCredentials() {
    const params: any = { from: 0, size: 1000 };

    this.restService.adminGetProviderCredentials(params)
      .subscribe( r => {
        this.pCItemsFound = r.itemsFound;
        this.pCCredentials = r.hits;
      }, err => {
        this.snackMessage.open('Error loading credentials', 'x', {verticalPosition: 'top'});
      });
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  selectProviderCredentials(pc) {
    this.selectedProviderCredential = pc;
    this.loadBucketList();
  }

  hasBucketMonitor(bucket) {
    const params = {};
    this.restService.adminGetBucketMonitor(params)
      .subscribe( r => {}, err => {});
  }

  createBucketMonitor(bucketForNewMonitor) {
    const params = {
      providerCredentialId: this.selectedProviderCredential._id,
      provider: this.selectedProviderCredential.provider,
      providerBucket: bucketForNewMonitor.Name,
      status: 'IDLE'
    };

    this.restService.adminCreateBucketMonitor(params)
      .subscribe ( r => {
        this.snackMessage.open('Bucket monitor created', null, {duration: environment.snackBarDuration, verticalPosition: 'bottom'});
        this.loadData();
        this.startInventoryBucket(r.upsertedId._id);
      }, err => {
        this.snackMessage.open('Error creating bucket monitor', 'x', {verticalPosition: 'top'});
      });
  }

  isSelectedItem(item) {
    if (!this.selected || this.selected._id !== item._id) { return false; } else { return true; }
  }

  select(clickedItem) {
    // this.selected = clickedItem;
    this.router.navigate(['/private/bm', clickedItem._id]);
  }

  bucketsSelected($event) {

  }

  startInventoryBucket(bucketMonitorId) {
    this.restService.adminBmInventoryBucket({bucketMonitorId})
      .subscribe( r => {
        this.snackMessage.open('Inventory of the bucket started', null, {duration: environment.snackBarDuration, verticalPosition: 'bottom'});
      }, err => {
        this.snackMessage.open('Error starting bucket inventory', 'x', {verticalPosition: 'top'});
      });
  }

  gotoDashboard() {
    this.selected = null;
  }
}
