import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss']
})
export class UserNameComponent implements OnInit {

  @Input() user_id: string;
  loading = false;
  user: any;

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    const params = { user_id: this.user_id };

    this.restService.adminGetUser(params)
      .pipe(
        finalize(() => { this.loading = false; })
      )
      .subscribe ( r => {
        this.user = JSON.parse(r);
      }, e => {
        this.snackMessage.open('Error searching for user', 'x', {verticalPosition: 'top'});
      });
  }

}
