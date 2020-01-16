import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, finalize, switchMap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { Application } from '../../objects/application';

@Component({
  selector: 'app-application-users',
  templateUrl: './application-users.component.html',
  styleUrls: ['./application-users.component.scss']
})
export class ApplicationUsersComponent implements OnInit {

  @Input() application: Application;
  users: any[];
  searchSystemUserEmail: string;
  systemUsersLoading = false;

  itemsFound = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number [] = [5, 10, 25];

  appRoles = [
    {id: 'readonly', name: 'Read Only'},
    {id: 'edit', name: 'Edit'}
  ];

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.searchSystemUsers();
  }

  searchSystemUsers() {
    this.systemUsersLoading = true;
    this.users = null;
    const params = { pageIndex: this.pageIndex, pageSize: this.pageSize, searchTerms: {
        email: ( (this.searchSystemUserEmail && this.searchSystemUserEmail.length > 0 ) ? this.searchSystemUserEmail : null)
      }};

    this.restService.adminGetUsers(params)
      .pipe( finalize(() => { this.systemUsersLoading = false; }) )
      .subscribe( r => {
        const response = JSON.parse(r);
        this.users = response.users;
        this.itemsFound = response.total;
      }, err => {
        this.snackMessage.open('Error loading users', 'x', {verticalPosition: 'top'});
      });
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.searchSystemUsers();
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
    const matchingUsers = this.application.users.filter( u => u.user_id === user.user_id);
    return matchingUsers.length > 0;
  }

  removeUserFromApplication(user) {
    this.application.users = this.application.users.filter( u => u.user_id !== user.user_id);
  }

}
