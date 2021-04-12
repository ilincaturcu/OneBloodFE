import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})


export class AppointmentComponent implements OnInit {
  calendarClicked = false;
  date: string;
  hour: string;
  datePicked = false;
  hourPicked = false;
  requestSent = false;
  request = {doctorId: 1, date: 'a', hour: 'b', status: 'c'};
  avHours = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  constructor() { }

  ngOnInit(): void {
  }

  calendarClick(i: number) {
    this.calendarClicked = false;
    setTimeout(() => this.calendarClicked = true, 100);
    this.datePicked = false;
  }

  pickHour(hour) {
    this.hour = hour;
    this.request.date = this.date;
    this.request.doctorId = 1;
    this.request.hour = this.hour;
    this.request.status = 'pending';
    this.hourPicked = true;
    this.requestSent = false;
  }
}

