import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { SidenavBroadcastService } from '../../services/sidenav-broadcast/sidenav-broadcast.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  watcher: Subscription;
  activeMediaQuery = '';
  env: any = environment;

  constructor(public auth: AuthService,
              public router: Router,
              private sidenavBroadcaster: SidenavBroadcastService,
              private mediaObserver: MediaObserver) {

    this.watcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change.mqAlias;
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  toggleMenus() {
    this.sidenavBroadcaster.toggleMenu();
  }

}
