import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-branded-spinner',
  templateUrl: './branded-spinner.component.html',
  styleUrls: ['./branded-spinner.component.scss']
})
export class BrandedSpinnerComponent implements OnInit {

  @Input() width: number;

  constructor() { }

  ngOnInit() {
  }
}
