import { Component, Input, OnInit } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import * as uuid from 'uuid';
import { Observable, of, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Application } from '../../../objects/application';
import { DataStore } from '../../../objects/dataStore';

@Component({
  selector: 'app-application-data-stores',
  templateUrl: './application-data-stores.component.html',
  styleUrls: ['./application-data-stores.component.scss']
})
export class ApplicationDataStoresComponent implements OnInit {
  env = environment;

  @Input() applicationId: string;
  dataStores: DataStore[];
  selected: DataStore;

  emptyNewDataStore: any = { name: '', encrypted: false, dataEndpoints: [] };
  newDataStore: any = JSON.parse(JSON.stringify(this.emptyNewDataStore));

  loading = false;
  loadingSelected = false;

  private proposedName = new Subject<string>();
  uniqueName$: Observable<boolean>;

  itemsFound = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number [] = [5, 10, 25];

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit(): void {
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
    this.loading = true;
    const params = {
      from: (this.pageIndex * this.pageSize), size: this.pageSize,
      applicationId: this.applicationId
    };

    this.restService.adminGetDataStores(params)
      .pipe(finalize(() => { this.loading = false; }))
      .subscribe ( r => {
        this.dataStores = r.hits;
        this.itemsFound = r.count;
      }, err => {
        this.snackMessage.open('Error loading Data Stores', 'x', {verticalPosition: 'top'});
      });
  }

  loadDataStore(dataStoreId: string) {
    this.loadingSelected = true;

    this.restService.adminGetDataStore({ _id: dataStoreId })
      .pipe(finalize(() => { this.loadingSelected = false; }))
      .subscribe( r => {
        this.selected = r;
      }, err => {
        this.snackMessage.open('Error loading selected Data Store', 'x', {verticalPosition: 'top'});
      });
  }

  isSelectedItem(item) {
    if (!this.selected || this.selected._id !== item._id) { return false; } else { return true; }
  }

  select(clickedItem) {
    this.loadDataStore(clickedItem._id);
  }

  onResult($event): void {
    if (!$event) { return; }

    this.selected = $event;
    this.selected._id = uuid.v4();
    this.selected.applicationId = this.applicationId;

    this.saveDataStore();
    setTimeout( () => this.loadData(), 3000);

    this.newDataStore  = JSON.parse(JSON.stringify(this.emptyNewDataStore));
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

    //const matchingNames = this.application.dataStores.filter( ds => ds.name === name );
    //if ( matchingNames.length > 0) { return of(false); }

    return of (true);
  }

  checkUnique(id) {
    this.proposedName.next(id);
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  deleteSelectedDataStore() {

  }

  createDataEndpoint() {
    this.restService.adminCreateDataEndpoint(this.selected)
      .pipe(finalize(() => {  }))
      .subscribe ( r => {
        this.loadData();
      }, err => {
        this.snackMessage.open('Error saving Data Store', 'x', {verticalPosition: 'top'});
      });
  }

  saveDataStore() {
    this.restService.adminSaveDataStore(this.selected)
      .pipe(finalize(() => {  }))
      .subscribe ( r => {
      }, err => {
        this.snackMessage.open('Error saving Data Store', 'x', {verticalPosition: 'top'});
      });
  }

  comingSoon() {
    alert('Awaiting implementation.');
  }
}
