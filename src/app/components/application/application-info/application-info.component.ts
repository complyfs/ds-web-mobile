import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Application } from '../../../objects/application';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.scss']
})
export class ApplicationInfoComponent implements OnInit {

  @Input() application: Application;
  @Output() saveApplication = new EventEmitter<void>();
  @Output() deleteApplication = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  emitDeleteApplication() {
    this.deleteApplication.emit();
  }

  emitSaveApplication() {
    this.saveApplication.emit();
  }

}
