import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-boolean-display',
  templateUrl: './boolean-display.component.html',
  styleUrls: ['./boolean-display.component.scss']
})
export class BooleanDisplayComponent implements OnInit {

  @Input() readOnly: boolean;
  @Input() label: string;
  @Input() value: boolean;
  @Output() valueChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
