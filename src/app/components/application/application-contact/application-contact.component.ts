import { Component, OnInit, Input } from '@angular/core';
import { AppContact } from "../../../objects/application";

@Component({
  selector: 'app-application-contact',
  templateUrl: './application-contact.component.html',
  styleUrls: ['./application-contact.component.scss']
})
export class ApplicationContactComponent implements OnInit {

  @Input() appContact: AppContact;

  @Input() readOnly = true;

  constructor() { }

  ngOnInit() {
  }

}
