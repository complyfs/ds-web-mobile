import {Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';
import { DataEndpoint, DataStore } from '../../../objects/dataStore';
import * as uuid from 'uuid';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RestService } from '../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-application-data-endpoints',
  templateUrl: './application-data-endpoints.component.html',
  styleUrls: ['./application-data-endpoints.component.scss']
})
export class ApplicationDataEndpointsComponent implements OnInit, OnChanges {
  env = environment;

  @Input() dataStore: DataStore;
  @Output() reloadDataStore = new EventEmitter<void>();
  selected: DataEndpoint;
  emptyNewDataEndpoint: any = {
    name: '',
    providerCredentialId: null,
    region: null,
    type: null,
    active: false
  };

  newDataEndpoint: any = JSON.parse(JSON.stringify(this.emptyNewDataEndpoint));

  providerCredentials: any[];

  loading = false;

  private proposedName = new Subject<string>();
  uniqueName$: Observable<boolean>;

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.uniqueName$ = this.proposedName.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((proposedName: string) => this.isNameUnique(proposedName)),
    );

    this.loadData();
  }

  loadData() {
    // TODO: this must eventually handle large credential sets differently
    const params: any = { from: 0, size: 1000 };

    this.restService.adminGetProviderCredentials(params)
      .subscribe( r => {
        this.providerCredentials = r.hits;
      }, err => {
        this.snackMessage.open('Error loading provider credentials', 'x', {verticalPosition: 'top'});
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selected = null;
  }

  isSelectedItem(item) {
    if (!this.selected || this.selected.id !== item.id) { return false; } else { return true; }
  }

  select(clickedItem) {
    this.selected = clickedItem;
  }

  onResult($event): void {
    if (!$event) { return; }

    this.selected = $event;
    this.selected.id = 'ds-' + uuid.v4();
    this.createDataEndpoint();

    this.newDataEndpoint = JSON.parse(JSON.stringify(this.emptyNewDataEndpoint));
  }

  createDataEndpoint() {
    const params = {
      dataStore: this.dataStore,
      dataEndpoint: this.selected
    };

    this.restService.adminCreateDataEndpoint(params)
      .subscribe( r => {
        this.reloadDataStore.emit();
      }, err => {
        this.snackMessage.open('Error creating endpoints', 'x', {verticalPosition: 'top'});
      });
  }

  isNameUnique(name): Observable<boolean> {
    console.log('isNameUnique');
    if (!name) {
      return of (false);
    }

    if (!name.trim()) {
      // if not search term, return empty hero array.
      return of(false);
    }

    const matchingNames = this.dataStore.dataEndpoints.filter( de => de.name === name );
    if ( matchingNames.length > 0) { return of(false); }

    return of (true);
  }

  checkUnique(id) {
    this.proposedName.next(id);
  }

  getRegionsForProvider() {
    const providerCredentials = this.getCredentials();

    if (!providerCredentials) return [];

    const providerRegions = environment.providerRegions.filter( r => {
      return r.provider === providerCredentials.provider;
    } );

    return providerRegions;
  }

  getTypesForProvider() {
    const providerCredentials = this.getCredentials();

    if (!providerCredentials) return [];

    const providerTypes = environment.providerEndpointTypes.filter( r => {
      return r.provider === providerCredentials.provider;
    } );

    return providerTypes;
  }

  getCredentials() {
    if (!this.newDataEndpoint.providerCredentialId) { return null; }

    const selectedCredentials = this.providerCredentials.filter( cr => {
      return cr._id === this.newDataEndpoint.providerCredentialId;
    });

    if (selectedCredentials.length !== 1) {
      return null;
    }

    return selectedCredentials[0];
  }

}
