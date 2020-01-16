import {Component, Input, OnInit} from '@angular/core';
import {finalize} from "rxjs/operators";
import {RestService} from "../../services/rest/rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-credential-name',
  templateUrl: './credential-name.component.html',
  styleUrls: ['./credential-name.component.scss']
})
export class CredentialNameComponent implements OnInit {

  @Input() credentialId: string;
  loading = false;
  credential: any;

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.credential = null;
    this.loading = true;

    const params = { _id: this.credentialId };

    this.restService.adminGetCredential(params)
      .pipe(
        finalize(() => { this.loading = false; })
      )
      .subscribe ( r => {
        this.credential = r;
      }, e => {
        this.snackMessage.open('Error getting credentials', 'x', {verticalPosition: 'top'});
      });
  }
}
