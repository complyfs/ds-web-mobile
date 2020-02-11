import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';
import { MatSidenav, MatSidenavContainer } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { SidenavBroadcastService } from '../../services/sidenav-broadcast/sidenav-broadcast.service';

@Component({
  selector: 'app-admin-root',
  templateUrl: './admin-root.component.html',
  styleUrls: ['./admin-root.component.scss']
})
export class AdminRootComponent implements OnInit, OnDestroy {
  @ViewChild(SidebarMenuComponent) sidebarMenu: SidebarMenuComponent;
  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;
  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;
  menuToggleBroadcastSubscription: Subscription;

  constructor(public auth: AuthService,
              private sidenavBroadcaster: SidenavBroadcastService) {

    this.menuToggleBroadcastSubscription = sidenavBroadcaster.menuToggled$.subscribe( bValue => {
      this.toggleMenu();
    });
    this.menuToggleBroadcastSubscription = sidenavBroadcaster.textToggled$.subscribe( bValue => {
      this.toggleText();
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.menuToggleBroadcastSubscription.unsubscribe();
  }

  toggleMenu() {
    this.sidenav.toggle();
  }

  toggleText() {
    this.sidenavContainer.autosize = true;
    setTimeout(() => { this.sidenavContainer.autosize = false; } , 1000);
  }

}
