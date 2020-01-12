import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as uuid from 'uuid';
import { PageEvent } from '@angular/material/paginator';
import { Observable, of, Subject } from 'rxjs';
import {
  finalize, debounceTime, distinctUntilChanged, map, switchMap, tap
} from 'rxjs/operators';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {

  tenants: any[];
  selectedTenant: any;
  newTenant: any = { name: ''};

  loading: boolean = false;
  selectedLoading: boolean = false;

  private proposedTenantId = new Subject<string>();
  uniqueID$: Observable<boolean>;

  itemsFound: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number [] = [5, 10, 25];

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.uniqueID$ = this.proposedTenantId.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((proposedId: string) => this.isTenantIdUnique(proposedId)),
    );

    this.loadData();
  }

  loadData() {
    const params: any = { from: (this.pageIndex * this.pageSize), size: this.pageSize };

    this.restService.superadminGetTenants(params)
      .subscribe( r => {
        this.itemsFound = r.itemsFound;
        this.tenants = r.hits;
      }, err => {
        this.snackMessage.open('Error loading tenants', 'x',{verticalPosition: 'top'});
      });
  }

  onResult($event): void {

    if (!$event) { return; }

    this.selectedTenant = $event;
    //this.selectedTenant._id = uuid.v4();
    this.saveTenant();
    setTimeout( () => { this.loadData(); }, 2000);
  }

  saveTenant() {
    this.restService.superadminSaveTenant(this.selectedTenant)
      .subscribe( r => {

      }, err => {
        this.snackMessage.open('Error saving tenants', 'x',{verticalPosition: 'top'});
      });
  }

  isSelectedItem(item) {
    if (!this.selectedTenant || this.selectedTenant._id !== item._id) { return false; }
    else { return true; }
  }

  select(clickedItem) {
    this.selectedTenant = null;
    this.selectedLoading = true;

    const params = { _id: clickedItem._id };

    this.restService.superadminGetTenant(params)
      .pipe(
        finalize(() => { this.selectedLoading = false; })
      )
      .subscribe ( r => {
        this.selectedTenant = r;
      }, e => {
        this.snackMessage.open('Error getting tenant', 'x',{verticalPosition: 'top'});
      });
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  isTenantIdUnique(Id): Observable<boolean> {
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
    this.proposedTenantId.next(id);
  }

}
