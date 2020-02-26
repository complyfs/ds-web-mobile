import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../../services/rest/rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-bm-most-recent-file-per-tenant',
  templateUrl: './bm-most-recent-file-per-tenant.component.html',
  styleUrls: ['./bm-most-recent-file-per-tenant.component.scss']
})
export class BmMostRecentFilePerTenantComponent implements OnInit {

  bucketList: any[];

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
    const params: any = {   }; // only param is tenantId, added on server

    this.restService.adminBmBucketLastDocModified(params)
      .subscribe( r => {
        this.bucketList = r;

        this.pageIndex = 0;

        this.itemsFound = this.bucketList.length;

      }, err => {
        this.snackMessage.open('Error loading most recent file data', 'x', {verticalPosition: 'top'});
      });

  }

}
