import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';
import { SidenavBroadcastService } from '../../services/sidenav-broadcast/sidenav-broadcast.service';

@Component({
  selector: 'app-private-root',
  templateUrl: './private-root.component.html',
  styleUrls: ['./private-root.component.scss']
})
export class PrivateRootComponent implements OnInit, OnDestroy {
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
