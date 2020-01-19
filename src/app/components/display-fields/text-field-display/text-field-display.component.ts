import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-field-display',
  templateUrl: './text-field-display.component.html',
  styleUrls: ['./text-field-display.component.scss']
})
export class TextFieldDisplayComponent implements OnInit {

  @Input() readOnly: boolean;
  @Input() label: string;
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
