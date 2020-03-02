import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {RestService} from "../../../services/rest/rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-virt-bucket-apps-dashboard',
  templateUrl: './virt-bucket-apps-dashboard.component.html',
  styleUrls: ['./virt-bucket-apps-dashboard.component.scss']
})
export class VirtBucketAppsDashboardComponent implements OnInit {

  constructor(private restService: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {

  }

}
