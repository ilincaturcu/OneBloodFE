import { Component, OnInit } from '@angular/core';
import { Appointment } from '../Appointment';
import { AppointmentService } from '../appointment.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-medical-results',
  templateUrl: './medical-results.component.html',
  styleUrls: ['./medical-results.component.scss']
})
export class MedicalResultsComponent implements OnInit {

  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public appointments: Appointment[];
  public columns = ['appointmentDate', 'hour', 'name', 'cancel'];
  public button = {"progress" : "","pending":"Cancel", "completed":"Results"};
  public status= ["progress","pending", "completed"]

  getAppointmentsData: Appointment[] = [
    {
      status: "progress", 
      appointmentDate: new Date().toDateString(),
      hour : "10",
      _id : "5",
  
    },
    {
      status: "pending", 
      appointmentDate: new Date().toDateString(),
      hour : "10",
      _id : "6",
  
    },
    {
      status: "completed", 
      appointmentDate: new Date().toDateString(),
      hour : "10",
      _id : "7",
  
    }
  ]
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.appointmentService.getAppointments()
      .subscribe((appointments: Appointment[]) => {
        //de schimbat aici ca sa ia datele bune
        //this.appointments = this.appointments;
        this.appointments = this.getAppointmentsData;
        console.log(this.getAppointmentsData);
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      });
      this.appointments = this.getAppointmentsData;
      console.log(this.getAppointmentsData);
  }

  cancelAppointment(id: string) {
    this.appointmentService.cancelAppointment(id)
      .pipe(
        mergeMap(() => this.appointmentService.getAppointments())
      )
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.successMsg = 'Successfully cancelled appointment';
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }
}
