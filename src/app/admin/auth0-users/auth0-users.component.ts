import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-auth0-users',
  templateUrl: './auth0-users.component.html',
  styleUrls: ['./auth0-users.component.scss']
})
export class Auth0UsersComponent implements OnInit {

  users: any[];
  selectedUser: any;
  searchEmail: string;

  usersLoading: boolean = false;
  selectedUserLoading: boolean = false;

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
    this.usersLoading = true;
    const params = { pageIndex: this.pageIndex, pageSize: this.pageSize, searchTerms: {
      email: ( (this.searchEmail && this.searchEmail.length > 0 ) ? this.searchEmail : null)
    }};

    this.restService.adminGetUsers(params)
      .pipe(
        finalize(() => { this.usersLoading = false; })
      )
      .subscribe ( r => {
        const response = JSON.parse(r);
        this.users = response.users;
        this.itemsFound = response.total;

      }, e => {
        this.snackMessage.open('Error searching for users', 'x',{verticalPosition: 'top'});
      });
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  selectUser(clickedUser) {
    this.selectedUser = null;
    this.selectedUserLoading = true;

    const params = { user_id: clickedUser.user_id };

    this.restService.adminGetUser(params)
      .pipe(
        finalize(() => { this.selectedUserLoading = false; })
      )
      .subscribe ( r => {
        this.selectedUser = JSON.parse(r);
      }, e => {
        this.snackMessage.open('Error getting user', 'x',{verticalPosition: 'top'});
      });
  }

  isSelectedItem(listUser) {
    if (!this.selectedUser || this.selectedUser.user_id !== listUser.user_id) { return false; }
    else { return true; }
  }

  updateSelectedUser() {
    this.restService.adminUpdateUser(this.selectedUser)
      .subscribe( r => {
        this.snackMessage.open('User updated', null,{verticalPosition: 'bottom', duration:  environment.snackBarDuration});
      }, e => {
        this.snackMessage.open('Error updating user', 'x',{verticalPosition: 'top'});
      });
  }

}
