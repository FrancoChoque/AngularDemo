import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as momentTz from 'moment-timezone';
import { TimezonesService } from './../timezones.service';
import { Observable, interval, Observer } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedTimezone: string = "";
  timezones: string[];
  dateFormat = "DD-MM-YYYY h:mm:ss "
  time: string;
  requestedTime: string;


  constructor(private timezonesService: TimezonesService) { }

  ngOnInit() {
    const clock = new Observable(observer => {
      setInterval(() => {
        observer.next(moment().format(this.dateFormat));
      }, 1000);
    });
    clock.subscribe(
      (data: string) => { this.time = data },
    );
    this.timezones = this.timezonesService.getTimeZones();
  }

  onTimezoneSelected() {
    const clock = new Observable(observer => {
      setInterval(() => {
        const date = momentTz();
        observer.next(date.tz(this.selectedTimezone).format(this.dateFormat));
      }, 1000);
    });
    clock.subscribe(
      (data: string) => {
        this.requestedTime = data        
      },
    );
  }
}
