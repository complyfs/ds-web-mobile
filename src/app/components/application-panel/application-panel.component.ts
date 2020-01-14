import { Component, OnInit, Input } from '@angular/core';
import {RestService} from "../../services/rest/rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-application-panel',
  templateUrl: './application-panel.component.html',
  styleUrls: ['./application-panel.component.scss']
})
export class ApplicationPanelComponent implements OnInit {

  @Input() application: any;
  dataBuckets: any;
  dataRates: any;

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const params: any = { _id: this.application._id };

    this.restService.getApplicationGraphs(params)
      .subscribe( r => {
        this.dataBuckets = r.dataBuckets;
        this.dataRates = r.dataRates;
      }, err => {
        this.snackMessage.open('Error loading application graphs', 'x', {verticalPosition: 'top'});
      });
  }

}
