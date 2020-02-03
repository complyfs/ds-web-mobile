import {Component, Input, OnInit} from '@angular/core';
import {RestService} from "../../services/rest/rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-provider-credential-name',
  templateUrl: './provider-credential-name.component.html',
  styleUrls: ['./provider-credential-name.component.scss']
})
export class ProviderCredentialNameComponent implements OnInit {

  @Input() providerCredentialId: string;
  loading = false;
  providerCredential: any;

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.providerCredential = null;
    this.loading = true;

    const params = { _id: this.providerCredentialId };

    this.restService.adminGetProviderCredential(params)
      .pipe(
        finalize(() => { this.loading = false; })
      )
      .subscribe ( r => {
        this.providerCredential = r;
      }, e => {
        this.snackMessage.open('Error getting provider credentials', 'x', {verticalPosition: 'top'});
      });
  }
}
