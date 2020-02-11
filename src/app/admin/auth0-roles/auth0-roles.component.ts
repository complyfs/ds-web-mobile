import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-auth0-roles',
  templateUrl: './auth0-roles.component.html',
  styleUrls: ['./auth0-roles.component.scss']
})
export class Auth0RolesComponent implements OnInit {
  loading: boolean = false;
  nameFilter: string = '';
  roles: any[];

  itemsFound: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number [] = [5, 10, 25];

  constructor(private rest: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    const params: any = { pageIndex: this.pageIndex, pageSize: this.pageSize};
    if (this.nameFilter.length > 0) { params.name_filter = this.nameFilter; }

    this.rest.adminGetRoles(params)
      .pipe(
        finalize(() => { this.loading = false; })
      )
      .subscribe ( r => {
        const response = JSON.parse(r);
        this.roles = response.roles;
        this.itemsFound = response.total;
      }, e => {
        this.snackMessage.open('Error searching for users', 'x',{verticalPosition: 'top'});
      });
  }

}
