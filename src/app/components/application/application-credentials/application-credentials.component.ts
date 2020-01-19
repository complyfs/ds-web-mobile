import { Component, Input, OnInit } from '@angular/core';
import { Application } from '../../../objects/application';
import {RestService} from '../../../services/rest/rest.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-application-credentials',
  templateUrl: './application-credentials.component.html',
  styleUrls: ['./application-credentials.component.scss']
})
export class ApplicationCredentialsComponent implements OnInit {

  @Input() application: Application;
  loading = false;
  result: any;

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) {
  }

  ngOnInit() {
  }

  getAuth0Client() {
    this.result = null;
    this.loading = true;

    this.restService.adminGetAuth0Client({})
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe(r => {
        this.result = JSON.parse(r);
      }, err => {
        this.snackMessage.open('Error loading auth0 client', 'x', {verticalPosition: 'top'});
      });
  }

  getAuth0Clients() {
    this.result = null;
    this.loading = true;

    this.restService.adminGetAuth0Clients({})
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe(r => {
        this.result = JSON.parse(r);
      }, err => {
        this.snackMessage.open('Error loading auth0 clients', 'x', {verticalPosition: 'top'});
      });
  }

  createAuth0Client() {
    this.result = null;
    this.loading = true;

    const params = {
      name: 'Test Anglular Build ' + new Date().toISOString(),
      description: 'Test Anglular Build Description',
      grant_types: [
        'client_credentials'
      ],
      token_endpoint_auth_method: 'client_secret_post',
      app_type: 'non_interactive',
      is_first_party: true,
      oidc_conformant: true,
      sso_disabled: false,
      cross_origin_auth: false,
      jwt_configuration: {
        lifetime_in_seconds: 36000,
        scopes: {  },
        alg: 'RS256'
      },
      custom_login_page_on: false,
      client_metadata: {
        dsClientId: '123',
        dsTenant: 'bancobig',
        dsAppId: 'asdf'
      },
      initiate_login_uri: '',
      refresh_token: {
        type: 'reusable',
        leeway: 0
      }
    };

    this.restService.adminCreateAuth0Client(params)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe(r => {
        this.result = JSON.parse(r);
      }, err => {
        this.snackMessage.open('Error loading auth0 clients', 'x', {verticalPosition: 'top'});
      });
  }

}
