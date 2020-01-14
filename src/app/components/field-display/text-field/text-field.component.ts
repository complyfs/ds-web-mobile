import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {

  @Input() readOnly: boolean;
  @Input() label: string;
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
