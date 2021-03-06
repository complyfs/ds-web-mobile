import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { DsApplication } from '../../../objects/ds-application';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss']
})
export class ApplicationDetailComponent implements OnInit, OnChanges {

  @Input() applicationId: string;
  application: DsApplication;
  @Output() reloadApps = new EventEmitter<void>();

  loading = false;
  selectedTabIndex: number;


  constructor(private restService: RestService,
              private snackMessage: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.applicationId = params.applicationId;

        this.loadData();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.application = null;

    const params = { _id: this.applicationId };

    this.restService.adminGetApplication(params)
      .pipe( finalize(() => { this.loading = false; }) )
      .subscribe ( r => {
        this.application = r;
      }, e => {
        this.snackMessage.open('Error getting application data', 'x', {verticalPosition: 'top'});
      });
  }

  saveApplication() {
    this.restService.adminSaveApplication(this.application)
      .subscribe( r => {
        this.snackMessage.open('Application saved', null, { duration: environment.snackBarDuration, verticalPosition: 'bottom' });
        this.loadData();
      }, err => {
        this.snackMessage.open('Error saving Application', 'x', {verticalPosition: 'top'});
      });
  }

  deleteApplication() {
    if (confirm('Are you sure you want to delete this application?')) {
      this.restService.adminDeleteApplication({ applicationId: this.application._id } )
        .subscribe ( r => {
          this.application = null;
          this.reloadApps.emit();
        }, err => {
          let sm;
          if (err.error && err.error.message) {
            sm = err.error.message;
          }
          else {
            sm = 'Error deleting application';
          }
          this.snackMessage.open(sm, 'X', {verticalPosition: 'top'});
        });
    }
  }

  tabChanged($event) {
    this.selectedTabIndex = $event.index;
    console.log(this.selectedTabIndex);
    //this.activateCenteredTab();
  }
}
