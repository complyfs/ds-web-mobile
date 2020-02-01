import { Component, Input, OnInit } from '@angular/core';
import { Application } from '../../../objects/application';
import { Observable, of, Subject } from 'rxjs';
import { RestService } from '../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, finalize, switchMap } from 'rxjs/operators';
import * as uuid from 'uuid';
import { RestCredential} from '../../../objects/restCredential';
import { DataStore } from '../../../objects/dataStore';

@Component({
  selector: 'app-application-rest-credentials',
  templateUrl: './application-rest-credentials.component.html',
  styleUrls: ['./application-rest-credentials.component.scss']
})
export class ApplicationRestCredentialsComponent implements OnInit {

  @Input() application: Application;
  restCredentials: RestCredential[];
  selectedRestCredential: RestCredential;
  dataStores: DataStore[];
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
    this.loadDataStores();

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

  loadDataStores() {
    //this.loading = true;
    const params = {
      from: (this.pageIndex * this.pageSize), size: this.pageSize,
      applicationId: this.application._id
    };

    this.restService.adminGetDataStores(params)
      .pipe(finalize(() => {  }))
      .subscribe ( r => {
        this.dataStores = r.hits;
        this.itemsFound = r.count;
      }, err => {
        this.snackMessage.open('Error loading Data Stores', 'x', {verticalPosition: 'top'});
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
    params.applicationId = this.application._id;

    this.restService.adminCreateRestCredAuth0Client(params)
      .pipe(finalize(() => {
        this.loadingSelectedRestCredential = false;
        this.loadingSelectedAuth0Client = false;
        this.loadingSelectedAuth0ClientGrants = false;
      }))
      .subscribe(r => {
        const result = (r);
        this.newCredential  = JSON.parse(JSON.stringify(this.emptyNewCredential));
        this.select({_id: result.upserted[0]._id });
        this.loadData();
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

  hasAccessToDataStore(datastore: DataStore) {
    return this.selectedAuth0Client.client_metadata.dataStores.indexOf(datastore._id) > -1;
  }

  updateDataStoreAccess(datastore: DataStore, $event) {
    if ($event.checked) {
      this.selectedAuth0Client.client_metadata.dataStores += datastore._id + ' ';
    }
    else {
      const startLoc = this.selectedAuth0Client.client_metadata.dataStores.indexOf(datastore._id);
      this.selectedAuth0Client.client_metadata.dataStores =
        this.selectedAuth0Client.client_metadata.dataStores.substring(0, startLoc) +
        this.selectedAuth0Client.client_metadata.dataStores.substring(startLoc + datastore._id.length + 1);
    }

    console.log(JSON.stringify(this.selectedAuth0Client.client_metadata, null, 4));

    this.updateAuth0Client();
  }

  updateAuth0Client() {
    const params = {
      updateBody: {
        client_metadata: this.selectedAuth0Client.client_metadata
      },
      client_id: this.selectedAuth0Client.client_id
    };

    this.restService.adminUpdateAuth0Client(params)
      .pipe( finalize(() => { /* this.updatingRestCredential = false; */ }) )
      .subscribe( r => {

      }, err => {
        this.snackMessage.open('Error updating rest credential', 'x', {verticalPosition: 'top'});
      });
  }

  deleteRestCredential(restCredential) {
    if (!confirm('Are you sure you wish to delete this credential?')) { return; }

    const params = {
      restCredential_id: this.selectedRestCredential._id,
      auth0_client_id: this.selectedAuth0Client.client_id,
      auth0_client_grants_id: this.selectedAuth0ClientGrants.id
    };

    this.restService.adminDeleteRestCredAuth0Client(params)
      .subscribe (r => {
        this.selectedRestCredential = null;
        this.selectedAuth0Client = null;
        this.selectedAuth0ClientGrants = null;

        this.loadData();
      }, err => {
        this.snackMessage.open('Error deleting credential', 'x', {verticalPosition: 'top'});
      });

  }
}
