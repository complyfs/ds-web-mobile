import { Component, OnInit } from '@angular/core';
import {RestService} from "../../services/rest/rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-application-users',
  templateUrl: './application-users.component.html',
  styleUrls: ['./application-users.component.scss']
})
export class ApplicationUsersComponent implements OnInit {

  users: any[];

  itemsFound: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number [] = [5, 10, 25];

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const params: any = {
      from: (this.pageIndex * this.pageSize), size: this.pageSize,
      searchTerms: {}
    };

    this.restService.adminGetUsers(params)
      .subscribe( r => {
        const response = JSON.parse(r);
        this.users = response.users;
        this.itemsFound = response.total;
      }, err => {
        this.snackMessage.open('Error loading users', 'x',{verticalPosition: 'top'});
      });
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  selectuser(user) {

  }
  isSelectedItem(item) {
    return false;
  }

}
