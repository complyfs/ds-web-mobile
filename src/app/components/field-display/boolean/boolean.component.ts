import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss']
})
export class BooleanComponent implements OnInit {

  @Input() readOnly: boolean;
  @Input() label: string;
  @Input() value: boolean;
  @Output() valueChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
