import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest/rest.service';
import {PageEvent} from '@angular/material/paginator';
import {finalize} from 'rxjs/operators';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  loading: boolean = false;
  logs: any;
  selectedLog: any;
  selectedLevel: string = '';

  itemsFound: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number [] = [5, 10, 25];

  levels = [
    'error',
    'warn',
    'info',
    'verbose',
    'debug',
    'silly'
  ];

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.selectedLog = null;
    const params: any = { from: (this.pageIndex * this.pageSize), size: this.pageSize };

    if (this.selectedLevel.length > 0) { params.level = this.selectedLevel; }

    this.restService.adminGetLogs(params)
      .pipe(
        finalize(() => { this.loading = false; })
      )
      .subscribe( r => {
        this.logs = r.hits;
        this.itemsFound = r.itemsFound;
      }, e => {
        console.log(e);
        this.snackMessage.open('Error loading logs', 'x',{verticalPosition: 'top'});
      });
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  selectLog(log:any) {
    this.selectedLog = log;
  }

  isSelectedItem(item) {
    return (!this.selectedLog || this.selectedLog._id !== item._id) ? false : true;
  }
}
