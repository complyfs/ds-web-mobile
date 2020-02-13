import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-virtual-bucket-ticker',
  templateUrl: './virtual-bucket-ticker.component.html',
  styleUrls: ['./virtual-bucket-ticker.component.scss']
})
export class VirtualBucketTickerComponent implements OnInit, OnDestroy {
  @Input() virtualBucketId: string;
  @Input() maxTickerLength: number = environment.dsTickerLength;

  recentTicks: any[] = [];
  socket: any;

  constructor() { }

  ngOnInit() {
    this.docSocket();
  }

  ngOnDestroy() {
    this.socket.emit('leaveVirtualBucketRoom', {birtualBucketId: this.virtualBucketId, user: 'patrick', nickname: 'patrick'});
    this.socket.close();
  }

  docSocket() {
    const eventToListenTo = 'dsTick';

    this.socket = io(environment.dsSocketURL);

    this.socket.on('connect', () => {
      // Join the room.
      console.log('joined socket');
      this.socket.emit('joinVirtualBucketRoom', {virtualBucketId: this.virtualBucketId, user: 'patrick', nickname: 'patrick'});
    });

    this.socket.on(eventToListenTo, (data) => {
      this.recentTicks.unshift(data);
      if (this.recentTicks.length > this.maxTickerLength) {
        this.recentTicks.pop();
      }
    });
  }

  onProvider(tick, provider) {
    return tick.providerEndpoints.filter( de => de.provider === provider).length > 0;
  }
}
