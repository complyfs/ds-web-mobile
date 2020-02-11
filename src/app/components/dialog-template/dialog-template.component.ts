import { Component, OnInit, ContentChild, EventEmitter,  Output,  TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogTemplateComponent implements OnInit {

  @ContentChild(TemplateRef) template: TemplateRef<{}>;
  @Output() result = new EventEmitter();

  dRef: MatDialogRef<any>;

  constructor (private dialog: MatDialog) {}

  ngOnInit() {}

  open () {
    this.dRef = this.dialog.open(this.template, {panelClass: 'cfs-modal-dialog'});
    this.dRef.afterClosed().subscribe(val => this.result.emit(val));
  }

}
