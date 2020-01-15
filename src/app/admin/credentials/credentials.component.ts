import { Component, OnInit } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import { RestService } from '../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';
import * as uuid from 'uuid';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {
  env = environment;

  credentials: any[];
  selected: any;
  emptyCredential: any = { provider: null, name: ''};
  newCredential = JSON.parse(JSON.stringify(this.emptyCredential));

  loading = false;
  selectedLoading = false;

  itemsFound = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number [] = [5, 10, 25];

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
      switchMap((proposedId: string) => this.isNameUnique(proposedId)),
    );

    this.loadData();
  }

  loadData() {
    const params: any = { from: (this.pageIndex * this.pageSize), size: this.pageSize };

    this.restService.adminGetCredentials(params)
      .subscribe( r => {
        this.itemsFound = r.itemsFound;
        this.credentials = r.hits;
      }, err => {
        this.snackMessage.open('Error loading credentials', 'x', {verticalPosition: 'top'});
      });
  }

  onResult($event): void {
    if (!$event) { return; }

    this.selected = $event;
    this.selected._id = uuid.v4();
    this.save();
  }

  save() {
    this.restService.adminSaveCredential(this.selected)
      .subscribe( r => {
        this.snackMessage.open('Credential saved', null, { duration: environment.snackBarDuration, verticalPosition: 'bottom' });
        this.loadData();
      }, err => {
        this.snackMessage.open('Error saving credential', 'x', {verticalPosition: 'top'});
      });
  }

  isSelectedItem(item) {
    if (!this.selected || this.selected._id !== item._id) { return false; } else { return true; }
  }

  select(clickedItem) {
    this.selected = null;
    this.selectedLoading = true;

    const params = { _id: clickedItem._id };

    this.restService.adminGetCredential(params)
      .pipe(
        finalize(() => { this.selectedLoading = false; })
      )
      .subscribe ( r => {
        this.selected = r;
      }, e => {
        this.snackMessage.open('Error getting tenant', 'x', {verticalPosition: 'top'});
      });
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  isNameUnique(Id): Observable<boolean> {
    if (!Id) {
      return of (false);
    }

    if (!Id.trim()) {
      // if not search term, return empty hero array.
      return of(false);
    }
    return this.restService.superadminGetTenant({ _id: Id })
      .pipe(
        tap(_ => console.log('fetched tenant')),
        map( r => {
          if (r) { return (false); }
          else { return (true); }
        })
      );
  }

  checkUnique(id) {
    this.proposedName.next(id);
  }

  getProviderLabel(providerId) {
    return this.env.providers.filter( prov => prov.id === providerId )[0].name;
  }
}
