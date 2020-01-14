import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  @Input() readOnly: boolean;
  @Input() label: string;
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
