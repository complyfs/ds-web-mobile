import { Component, Input, OnInit } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import * as uuid from 'uuid';
import { Observable, of, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Application, DataStore } from '../../../objects/application';

@Component({
  selector: 'app-application-data-stores',
  templateUrl: './application-data-stores.component.html',
  styleUrls: ['./application-data-stores.component.scss']
})
export class ApplicationDataStoresComponent implements OnInit {
  env = environment;

  @Input() application: Application;
  selected: DataStore;

  emptyNewDataStore: any = { name: '', encrypted: false, dataEndpoints: [] };
  newDataStore: any = JSON.parse(JSON.stringify(this.emptyNewDataStore));

  loading = false;

  private proposedName = new Subject<string>();
  uniqueName$: Observable<boolean>;

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
    this.selected.id = uuid.v4();
    this.application.dataStores.push(this.selected);

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

    const matchingNames = this.application.dataStores.filter( ds => ds.name === name );
    if ( matchingNames.length > 0) { return of(false); }

    return of (true);
  }

  checkUnique(id) {
    this.proposedName.next(id);
  }
}
