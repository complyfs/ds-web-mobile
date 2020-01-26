import { Component, Input, OnInit } from '@angular/core';
import { AppContact, Application, appContactRoles } from '../../../objects/application';
import { environment } from '../../../../environments/environment';
import { RestService } from '../../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as uuid from 'uuid';

@Component({
  selector: 'app-application-contacts',
  templateUrl: './application-contacts.component.html',
  styleUrls: ['./application-contacts.component.scss']
})
export class ApplicationContactsComponent implements OnInit {
  env = environment;

  @Input() application: Application;
  selected: AppContact;
  appRoles = appContactRoles;

  loading = false;

  emptyNewData: any = { firstName: '', lastName: '', Tel1: null, Tel2: null, title: null, email: null, contactRole: null};
  newData: any = JSON.parse(JSON.stringify(this.emptyNewData));

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    console.log( JSON.stringify(this.application.appContacts, null, 4));
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
    this.application.appContacts.push(this.selected);

    this.newData  = JSON.parse(JSON.stringify(this.emptyNewData));
  }

  newDataComplete() {
    return false;
  }

  getContactRole( contactRoleId) {
    const roles =  appContactRoles.filter( cr => cr.id === contactRoleId);
    return (roles.length !== 1) ?  null : roles[0].label;
  }

  removeContact (selected) {
    this.application.appContacts = this.application.appContacts.filter( ac => ac.id !== selected.id);
    this.selected = null;
  }
}
