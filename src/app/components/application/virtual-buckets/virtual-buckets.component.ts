import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { VirtualBucket } from '../../../objects/virtual-bucket';
import { Observable, of, Subject } from 'rxjs';
import { RestService } from '../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {debounceTime, distinctUntilChanged, finalize, map, switchMap, tap} from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-virtual-buckets',
  templateUrl: './virtual-buckets.component.html',
  styleUrls: ['./virtual-buckets.component.scss']
})
export class VirtualBucketsComponent implements OnInit {
  env = environment;

  @Input() applicationId: string;
  virtualBuckets: VirtualBucket[];
  selected: VirtualBucket;

  emptyNewVirtualBucket: any = { name: '', description: '', encrypted: false, providerEndpoints: [] };
  newVirtualBucket: any = JSON.parse(JSON.stringify(this.emptyNewVirtualBucket));

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
      debounceTime(250),

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

    this.restService.adminGetVirtualBuckets(params)
      .pipe(finalize(() => { this.loading = false; }))
      .subscribe ( r => {
        this.virtualBuckets = r.hits;
        this.itemsFound = r.count;
      }, err => {
        this.snackMessage.open('Error loading Virtual Buckets', 'x', {verticalPosition: 'top'});
      });
  }

  loadVirtualBucket(virtualBucketId: string) {
    this.loadingSelected = true;

    this.restService.adminGetVirtualBucket({ _id: virtualBucketId })
      .pipe(finalize(() => { this.loadingSelected = false; }))
      .subscribe( r => {
        this.selected = r;
      }, err => {
        this.snackMessage.open('Error loading selected Virtua lBucket', 'x', {verticalPosition: 'top'});
      });
  }

  isSelectedItem(item) {
    if (!this.selected || this.selected._id !== item._id) { return false; } else { return true; }
  }

  select(clickedItem) {
    this.loadVirtualBucket(clickedItem._id);
  }

  onResult($event): void {
    if (!$event) { return; }

    this.selected = $event;
    this.selected.applicationId = this.applicationId;

    this.saveVirtualBucket();
    setTimeout( () => this.loadData(), 3000);

    this.newVirtualBucket  = JSON.parse(JSON.stringify(this.emptyNewVirtualBucket));
  }

  isNameUnique(name): Observable<boolean> {
    console.log('isNameUnique', name);

    if (!name) {
      return of (false);
    }

    if (!name.trim()) {
      // if not search term, return empty hero array.
      return of(false);
    }

    return this.restService.adminGetVirtualBucket({ _id: name })
      .pipe(
        tap(_ => console.log('fetched vb')),
        map( r => {
          if (r) { return (false); } else { return (true); }
        })
      );
  }

  checkUnique(id) {
    this.proposedName.next(id);
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  deleteSelectedVirtualBucket() {
    if (this.selected.providerEndpoints.length > 0 ) {
      alert('You cannot delete a virtual bucket with endpoints.\n\nRemove all endpoints and try again.');
      return;
    }

    this.restService.adminDeleteVirtualBucket({ _id: this.selected._id })
      .pipe(finalize(() => {  }))
      .subscribe ( r => {
        this.selected = null;
        this.loadData();
      }, err => {
        this.snackMessage.open('Error deleting Virtual Bucket', 'x', {verticalPosition: 'top'});
      });
  }

  createProviderEndpoint() {
    this.restService.adminCreateProviderEndpoint(this.selected)
      .pipe(finalize(() => {  }))
      .subscribe ( r => {
        this.loadData();
      }, err => {
        this.snackMessage.open('Error saving Data Store', 'x', {verticalPosition: 'top'});
      });
  }

  saveVirtualBucket() {
    this.restService.adminSaveVirtualBucket(this.selected)
      .pipe(finalize(() => {  }))
      .subscribe ( r => {
      }, err => {
        this.snackMessage.open('Error saving Virtual Bucket', 'x', {verticalPosition: 'top'});
      });
  }

  comingSoon() {
    alert('Awaiting implementation.');
  }

  emptySelectedVirtualBucket() {
    if (!confirm('This cannot be undone. Empty this bucket?')) { return; }

    const params = {
      applicationId: this.selected.applicationId,
      virtualBucketId: this.selected._id
    };

    this.restService.adminEmptyVirtualBucket(params)
      .pipe(finalize(() => {  }))
      .subscribe ( r => {
        this.snackMessage.open('Request to empty this virtual bucket has been submitted', null, {verticalPosition: 'top', duration: environment.snackBarDuration});
      }, err => {
        this.snackMessage.open('Error saving Virtual Bucket', 'x', {verticalPosition: 'top'});
      }); ;
  }
}
