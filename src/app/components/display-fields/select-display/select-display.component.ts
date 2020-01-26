import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-select-display',
  templateUrl: './select-display.component.html',
  styleUrls: ['./select-display.component.scss']
})
export class SelectDisplayComponent implements OnInit {

  @Input() label: string;
  @Input() value: string;
  @Input() optionsArray: {id: string; label: string }[];
  @Input() readOnly: boolean;
  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
