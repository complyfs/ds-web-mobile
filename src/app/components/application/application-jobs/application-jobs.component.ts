import { Component, OnInit, Input } from '@angular/core';
import {RestService} from "../../../services/rest/rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageEvent} from "@angular/material/paginator";
import {environment} from "../../../../environments/environment";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-application-jobs',
  templateUrl: './application-jobs.component.html',
  styleUrls: ['./application-jobs.component.scss']
})
export class ApplicationJobsComponent implements OnInit {

  @Input() applicationId;
  jobs: any[];
  selected: any;

  loading = false;

  itemsFound: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number [] = [5, 10, 25];

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const params: any = {
      from: (this.pageIndex * this.pageSize), size: this.pageSize,
    };
    if (this.applicationId) { params.applicationId = this.applicationId; }

    this.loading = true;
    this.restService.adminGetJobs(params)
      .pipe( finalize(() => { this.loading = false; }) )
      .subscribe( r => {
        this.jobs = r.hits;
        this.itemsFound = r.itemsFound;
      }, err => {
        this.snackMessage.open('Error getting job deta', 'x', { verticalPosition: 'top', duration: environment.snackBarDuration});
      });
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  select(job: any) {
    this.selected = job;
  }

  isSelectedItem(item) {
    return (!this.selected || this.selected._id !== item._id) ? false : true;
  }

}
