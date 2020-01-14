import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { RestService } from '../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  applications: any[];
  selected: any;
  newApplication = { _id: '', name: ''};

  searchName: string;

  loading = false;
  selectedLoading = false;

  private proposedId = new Subject<string>();
  uniqueID$: Observable<boolean>;

  itemsFound = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number [] = [5, 10, 25];

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.uniqueID$ = this.proposedId.pipe(
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
    if (this.searchName && this.searchName.length > 0) {
      params.searchTerm = this.searchName;
    }

    this.restService.adminGetApplications(params)
      .subscribe( r => {
        this.itemsFound = r.itemsFound;
        this.applications = r.hits;
      }, err => {
        this.snackMessage.open('Error loading applications', 'x', {verticalPosition: 'top'});
      });
  }

  isSelectedItem(item) {
    if (!this.selected || this.selected._id !== item._id) { return false; } else { return true; }
  }

  select(clickedItem) {
    this.selected = clickedItem;
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
    return this.restService.adminGetApplication({ _id: Id })
      .pipe(
        tap(_ => console.log('fetched application')),
        map( r => {
          if (r) { return (false); } else { return (true); }
        })
      );
  }

  checkUnique(id) {
    this.proposedId.next(id);
  }

  onResult($event): void {
    if (!$event) { return; }

    this.selected = $event;
    // this.selectedTenant._id = uuid.v4();

    this.saveApplication();
  }

  saveApplication() {
    this.restService.adminSaveApplication(this.selected)
      .subscribe( r => {
        this.snackMessage.open('Application saved', null,{ duration: environment.snackBarDuration, verticalPosition: 'bottom' });
        this.loadData();
      }, err => {
        this.snackMessage.open('Error saving Application', 'x', {verticalPosition: 'top'});
      });
  }
}
