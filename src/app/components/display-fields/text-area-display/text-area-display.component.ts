import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-area-display',
  templateUrl: './text-area-display.component.html',
  styleUrls: ['./text-area-display.component.scss']
})
export class TextAreaDisplayComponent implements OnInit {

  @Input() readOnly: boolean;
  @Input() label: string;
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
