import { Component, Input, OnInit } from '@angular/core';
import { Application } from '../../../objects/application';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.scss']
})
export class ApplicationInfoComponent implements OnInit {

  @Input() application: Application;

  constructor() { }

  ngOnInit() {
  }

}
