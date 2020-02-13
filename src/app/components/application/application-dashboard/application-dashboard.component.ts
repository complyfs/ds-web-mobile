import { Component, OnInit, Input } from '@angular/core';
import { DsApplication } from '../../../objects/ds-application';
import {VirtualBucket} from "../../../objects/virtual-bucket";
import {RestService} from "../../../services/rest/rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-application-dashboard',
  templateUrl: './application-dashboard.component.html',
  styleUrls: ['./application-dashboard.component.scss']
})
export class ApplicationDashboardComponent implements OnInit {

  @Input() dsApplication: DsApplication;
  virtualBuckets: VirtualBucket[];

  itemsFound = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number [] = [5, 10, 25];

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const params = {
      applicationId: this.dsApplication._id,
      from: (this.pageIndex * this.pageSize), size: this.pageSize
    };

    this.restService.adminGetVirtualBuckets( params )
      .subscribe( r => {
        this.virtualBuckets = r.hits;
        this.itemsFound = r.itemsFound;
      }, err => {
        this.snackMessage.open('Error loading virtual buckets', 'x', {verticalPosition: 'top'});
      });
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

}
