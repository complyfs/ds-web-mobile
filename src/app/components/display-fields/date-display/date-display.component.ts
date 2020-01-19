import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-display',
  templateUrl: './date-display.component.html',
  styleUrls: ['./date-display.component.scss']
})
export class DateDisplayComponent implements OnInit {

  @Input() readOnly: boolean;
  @Input() label: string;
  @Input() value: string;
  @Input() dateFormat = 'medium';
  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
