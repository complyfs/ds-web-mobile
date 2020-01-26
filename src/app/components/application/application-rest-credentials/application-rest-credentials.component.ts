import { Component, Input, OnInit } from '@angular/core';
import { Application, Credential } from '../../../objects/application';
import { Observable, of, Subject } from 'rxjs';
import { RestService } from '../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, finalize, switchMap } from 'rxjs/operators';
import * as uuid from 'uuid';

@Component({
  selector: 'app-application-rest-credentials',
  templateUrl: './application-rest-credentials.component.html',
  styleUrls: ['./application-rest-credentials.component.scss']
})
export class ApplicationRestCredentialsComponent implements OnInit {

  @Input() application: Application;
  restCredentials: Credential[];
  selectedRestCredential: Credential;
  selectedAuth0Client: any;
  selectedAuth0ClientGrants: any;
  loadingRestCredentials = false;
  loadingSelectedRestCredential = false;
  loadingSelectedAuth0Client = false;
  loadingSelectedAuth0ClientGrants = false;
  result: any;

  itemsFound = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number [] = [5, 10, 25];

  emptyNewCredential: any = { name: '', read: false, write: false, list: false, delete: false };
  newCredential: any = JSON.parse(JSON.stringify(this.emptyNewCredential));

  private proposedName = new Subject<string>();
  uniqueName$: Observable<boolean>;

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) {
  }

  ngOnInit() {
    this.loadData();

    this.uniqueName$ = this.proposedName.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((proposedName: string) => this.isNameUnique(proposedName)),
    );
  }

  loadData() {
    const params = {
      applicationId: this.application._id,
      from: (this.pageIndex * this.pageSize), size: this.pageSize
    };
    this.loadingRestCredentials = true;

    this.restService.adminGetRestCredentials(params)
      .pipe( finalize(() => { this.loadingRestCredentials = false; }) )
      .subscribe ( r => {
        this.restCredentials = r.hits;
        this.itemsFound = r.itemsFound;
      }, err => {
        this.snackMessage.open('Error getting Rest Credentials', 'x', {verticalPosition: 'top'});
      });
  }

  isSelectedItem(item) {
    return false;
    // if (!this.selected || this.selected._id !== item._id) { return false; } else { return true; }
  }

  select(clickedRestCredential) {
    this.getRestCredential(clickedRestCredential._id);

    this.getAuth0Client(clickedRestCredential._id);

    this.getAuth0ClientGrants(clickedRestCredential._id);
  }

  getRestCredential(restCredentialId) {
    this.loadingSelectedRestCredential = true;
    this.selectedRestCredential = null;

    this.restService.adminGetRestCredential({ _id: restCredentialId})
      .pipe( finalize(() => { this.loadingSelectedRestCredential = false; }) )
      .subscribe ( r => {
        this.selectedRestCredential = r;
      }, err => {
        this.snackMessage.open('Error getting Rest Credential', 'x', {verticalPosition: 'top'});
      });
  }

  async onResult($event: any) {
    if (!$event) { return; }

    $event.applicationId = this.application._id;
    $event._id = uuid.v4();
    this.createAuth0Client($event);
  }

  isNameUnique(Id): Observable<boolean> {
    if (!Id) {
      return of (false);
    }

    if (!Id.trim()) {
      // if not search term, return empty hero array.
      return of(false);
    }

    return of(true);
    /*
    return this.restService.adminGetCredentials({ _id: Id })
      .pipe(
        tap(_ => console.log('fetched application')),
        map( r => {
          if (r) { return (false); } else { return (true); }
        })
      );*/
  }

  checkUnique(id) {
    this.proposedName.next(id);
  }

  getAuth0Client(restCredentialId) {
    this.selectedAuth0Client = null;
    this.loadingSelectedAuth0Client = true;

    this.restService.adminGetAuth0Client({client_id: restCredentialId})
      .pipe(finalize(() => { this.loadingSelectedAuth0Client = false; }))
      .subscribe(r => {
        this.selectedAuth0Client = JSON.parse(r);
      }, err => {
        this.snackMessage.open('Error loading auth0 client', 'x', {verticalPosition: 'top'});
      });
  }

  getAuth0ClientGrants(restCredentialId) {
    this.selectedAuth0ClientGrants = null;
    this.loadingSelectedAuth0ClientGrants = true;

    this.restService.adminGetAuth0ClientGrants({client_id: restCredentialId})
      .pipe(finalize(() => { this.loadingSelectedAuth0ClientGrants = false; }))
      .subscribe(r => {
        const tmp = JSON.parse(r);
        if (tmp.length > 1) { throw new Error('Too many grant objects'); }

        this.selectedAuth0ClientGrants = tmp[0];
        this.spreadClientGrantsToBoolean();
      }, err => {
        this.snackMessage.open('Error loading auth0 client grants', 'x', {verticalPosition: 'top'});
      });
  }

  getAuth0Clients() {
    this.result = null;
    this.loadingRestCredentials = true;

    this.restService.adminGetAuth0Clients({})
      .pipe(finalize(() => { this.loadingRestCredentials = false; }))
      .subscribe(r => {
        this.restCredentials = JSON.parse(r);
      }, err => {
        this.snackMessage.open('Error loading auth0 clients', 'x', {verticalPosition: 'top'});
      });
  }

  createAuth0Client($dialogResult) {
    this.selectedRestCredential = null;
    this.selectedAuth0Client = null;
    this.selectedAuth0ClientGrants = null;
    this.loadingSelectedRestCredential = true;
    this.loadingSelectedAuth0Client = true;
    this.loadingSelectedAuth0ClientGrants = true;

    const params = $dialogResult;
    params._id = uuid.v4();

    this.restService.adminCreateAuth0Client(params)
      .pipe(finalize(() => { /*this.loading = false;*/ }))
      .subscribe(r => {
        const result = (r);
        this.newCredential  = JSON.parse(JSON.stringify(this.emptyNewCredential));
        this.select({_id: result.upserted[0]._id });
      }, err => {
        this.snackMessage.open('Error creating credential', 'x', {verticalPosition: 'top'});
      });

  }

  updateClientGrants() {
    this.updateSelectedAuth0ClientGrants();
  }

  hasScope(scope): boolean {
    return this.selectedAuth0ClientGrants.scope.indexOf(scope) > -1  ? true : false;
  }

  spreadClientGrantsToBoolean() {

    this.selectedAuth0ClientGrants.read = false;
    this.selectedAuth0ClientGrants.write = false;
    this.selectedAuth0ClientGrants.list = false;
    this.selectedAuth0ClientGrants.delete = false;

    this.selectedAuth0ClientGrants.scope.forEach( clientGrant => {
      switch (clientGrant) {
        case 'doc:read':
          this.selectedAuth0ClientGrants.read = true;
          break;
        case 'doc:write':
          this.selectedAuth0ClientGrants.write = true;
          break;
        case 'doc:list':
          this.selectedAuth0ClientGrants.list = true;
          break;
        case 'doc:delete':
          this.selectedAuth0ClientGrants.delete = true;
          break;
      }
    });
  }

  updateSelectedAuth0ClientGrants() {
    this.restService.adminUpdateAuth0ClientGrants(this.selectedAuth0ClientGrants)
      .subscribe ( r => {
        console.log(JSON.stringify(r, null, 4));
        //this.getAuth0ClientGrants(this.selectedAuth0ClientGrants.id);
      }, err => {
        this.snackMessage.open('Error updating credential rights', 'x', {verticalPosition: 'top'});
      });
  }

  hasAccessToDataStore(datastore) {
    return true;
  }

  deleteRestCredential(restCredential) {
    if (!confirm('Are you sure you wish to delete this credential?')) { return; }

    const params = {
      restCredential_id: this.selectedRestCredential._id,
      auth0_client_id: this.selectedAuth0Client.id,
      auth0_client_grants_id: this.selectedAuth0ClientGrants.id
    };

    this.restService.adminDeleteAuth0Client(params)
      .subscribe (r => {

      }, err => {
        this.snackMessage.open('Error deleting credential', 'x', {verticalPosition: 'top'});
      });

  }
}
