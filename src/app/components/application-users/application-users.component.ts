import { Component, OnInit, Input } from '@angular/core';
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

  @Input() application: any;
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

  addUserToApplication(user) {
    const userObj = {
      user_id: user.user_id,
      appRole: 'readonly'
    };

    this.application.users.push(userObj);
  }

  userInApplication(user) {
    if (!('users' in this.application)) { this.application.users = []; }
    const matchingUsers = this.application.users.filter( u => u.user_id === user.user_id);
    return matchingUsers.length > 0;
  }

  removeUserFromApplication(user) {
    this.application.users = this.application.users.filter( u => u.user_id !== user.user_id);
  }

}
