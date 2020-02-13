import { Component, OnInit, Input } from '@angular/core';
import { AppContact, appContactRoles } from '../../../objects/ds-application';

@Component({
  selector: 'app-application-contact',
  templateUrl: './application-contact.component.html',
  styleUrls: ['./application-contact.component.scss']
})
export class ApplicationContactComponent implements OnInit {

  @Input() appContact: AppContact;

  @Input() readOnly = true;

  appRoles = appContactRoles;

  constructor() { }

  ngOnInit() {
  }

}
