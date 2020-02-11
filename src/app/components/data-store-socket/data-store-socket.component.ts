import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-data-store-socket',
  templateUrl: './data-store-socket.component.html',
  styleUrls: ['./data-store-socket.component.scss']
})
export class DataStoreSocketComponent implements OnInit, OnDestroy {

  @Input() dataStoreId: string;
  @Input() maxTickerLength: number = environment.dsTickerLength;

  recentTicks: any[] = [];
  socket: any;

  constructor() { }

  ngOnInit() {
    this.docSocket();
  }

  ngOnDestroy() {
    this.socket.emit('leaveDataStoreRoom', {dataStoreId: this.dataStoreId, user: 'patrick', nickname: 'patrick'});
    this.socket.close();
  }

  docSocket() {
    const eventToListenTo = 'dsTick';

    this.socket = io(environment.dsSocketURL);

    this.socket.on('connect', () => {
      // Join the room.
      console.log('joined socket');
      this.socket.emit('joinDataStoreRoom', {dataStoreId: this.dataStoreId, user: 'patrick', nickname: 'patrick'});
    });

    this.socket.on(eventToListenTo, (data) => {
      this.recentTicks.unshift(data);
      if (this.recentTicks.length > this.maxTickerLength) {
        this.recentTicks.pop();
      }
    });
  }

  onProvider(tick, provider) {
    return tick.dataEndpoints.filter( de => de.provider === provider).length > 0;
  }

}
