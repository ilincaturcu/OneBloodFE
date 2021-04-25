import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../Appointment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Hour {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  appointmentForm: FormGroup;
  public successMsg: string;
  public errorMsg: string;
  appointmentDate: string;
  name: string;
  email: string;

  hours: Hour[] = [
    {value: '10', viewValue: '10:00'},
    {value: '11', viewValue: '11:00'},
    {value: '12', viewValue: '12:00'}
  ];
  constructor(private appointmentService: AppointmentService, private fb: FormBuilder) { }

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      
      name: ['',Validators.required, Validators.maxLength(35)],
      email:['',Validators.required, Validators.email],
      hours:''
    })
  }

  createAppointment() {
    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService.createAppointment(this.appointmentDate, this.name, this.email)
      .subscribe((createdAppointment: Appointment) => {
        this.appointmentDate = '';
        this.name = '';
        this.email = '';
        const appointmentDate = new Date(createdAppointment.appointmentDate).toDateString();
        this.successMsg = `Appointment Booked Successfully for ${appointmentDate}`;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

}
