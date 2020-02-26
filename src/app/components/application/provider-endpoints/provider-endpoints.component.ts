import {Component, EventEmitter, Input, OnInit, Output, Provider, SimpleChanges, ViewChild} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProviderEndpoint, VirtualBucket } from '../../../objects/virtual-bucket';
import { Observable, of, Subject } from 'rxjs';
import { RestService } from '../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, finalize, switchMap } from 'rxjs/operators';
import * as uuid from 'uuid';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-provider-endpoints',
  templateUrl: './provider-endpoints.component.html',
  styleUrls: ['./provider-endpoints.component.scss']
})
export class ProviderEndpointsComponent implements OnInit {
  env = environment;

  @Input() virtualBucket: VirtualBucket;
  @Output() reloadVirtualBucket = new EventEmitter<void>();
  selected: ProviderEndpoint;
  moveObjectsFromProviderEndpoint: ProviderEndpoint;
  moveObjectsToProviderEndpoint: ProviderEndpoint;

  emptyNewProviderEndpoint: any = {
    name: '',
    provider: null,
    providerCredentialId: null,
    region: null,
    type: null,
    active: false
  };

  newProviderEndpointProviderCredential: any;

  @ViewChild('moveObjects', {static: true}) moveObjectsDialog: any;

  newProviderEndpoint: any = JSON.parse(JSON.stringify(this.emptyNewProviderEndpoint));

  providerCredentials: any[];

  loading = false;

  private proposedName = new Subject<string>();
  uniqueName$: Observable<boolean>;

  constructor(private auth: AuthService,
              private restService: RestService,
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
    if (!this.selected || this.selected.providerBucket !== item.providerBucket) { return false; } else { return true; }
  }

  select(clickedItem) {
    this.selected = clickedItem;
  }

  onResult($event): void {
    if (!$event) { return; }

    this.selected = $event;
    this.selected.providerBucket = 'ds-' + uuid.v4();

    this.selected.providerCredentialId = this.newProviderEndpointProviderCredential._id;
    this.selected.provider = this.newProviderEndpointProviderCredential.provider;

    this.createProviderEndpoint();

    this.newProviderEndpoint = JSON.parse(JSON.stringify(this.emptyNewProviderEndpoint));
    this.newProviderEndpointProviderCredential = null;
  }

  createProviderEndpoint() {
    const params = {
      virtualBucket: this.virtualBucket,
      providerEndpoint: this.selected
    };

    this.restService.adminCreateProviderEndpoint(params)
      .subscribe( r => {
        this.reloadVirtualBucket.emit();
      }, err => {
        this.snackMessage.open('Error creating provider endpoint', 'x', {verticalPosition: 'top'});
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

    const matchingNames = this.virtualBucket.providerEndpoints.filter( de => de.name === name );
    if ( matchingNames.length > 0) { return of(false); }

    return of (true);
  }

  checkUnique(id) {
    this.proposedName.next(id);
  }

  getRegionsForProvider() {
    const providerCredentials = this.getCredentials();

    if (!providerCredentials) { return []; }

    const providerRegions = environment.providerRegions.filter( r => {
      return r.provider === providerCredentials.provider;
    } );

    return providerRegions;
  }

  getTypesForProvider() {
    const providerCredentials = this.getCredentials();

    if (!providerCredentials) { return []; }

    const providerTypes = environment.providerEndpointTypes.filter( r => {
      return r.provider === providerCredentials.provider;
    } );

    return providerTypes;
  }

  getCredentials() {
    if (!this.newProviderEndpointProviderCredential) { return null; }

    const selectedCredentials = this.providerCredentials.filter( cr => {
      return cr._id === this.newProviderEndpointProviderCredential._id;
    });

    if (selectedCredentials.length !== 1) {
      return null;
    }

    return selectedCredentials[0];
  }

  deleteProviderEndpoint(deToDelete) {
    if (!confirm('Delete provider ndpoint: ' + deToDelete.name)) { return; }

    this.restService.adminDeleteProviderEndpoint({virtualBucket: this.virtualBucket, providerEndpoint: deToDelete })
      .pipe(finalize(() => {  }))
      .subscribe ( r => {
        this.reloadVirtualBucket.emit();
        this.selected = null;
      }, err => {
        this.snackMessage.open('Error deleting Provider Endpoint', 'x', {verticalPosition: 'top'});
      });
  }

  emptyProviderEndpoint(peToEmpty) {
    this.moveObjectsFromProviderEndpoint = peToEmpty;

    this.moveObjectsDialog.open();
  }

  moveObjectsDialogResult($event) {
    this.restService.adminMoveObjects({
      applicationId: this.virtualBucket.applicationId,
      virtualBucketId: this.virtualBucket._id,
      virtualBucket: this.virtualBucket,
      fromProviderEndpoint: this.moveObjectsFromProviderEndpoint,
      toProviderEndpoint: this.moveObjectsToProviderEndpoint
    })
      .pipe(finalize(() => {  }))
      .subscribe ( r => {
        this.snackMessage.open('Started emptying Provider Endpoint', null, {verticalPosition: 'bottom', duration: environment.snackBarDuration});
      }, err => {
        this.snackMessage.open('Error emptying Provider Endpoint', 'x', {verticalPosition: 'top'});
      });
  }

  getVirtualBucketsToMoveTo() {
    return this.virtualBucket.providerEndpoints;
  }
}
