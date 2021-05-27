import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/Appointment';
import { AppointmentService } from '../services/appointment.service';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  public columns = ['appointmentDate', 'hour', 'status', 'cancel'];
  public button = { "progress": "", "pending": "Cancel", "completed": "Results" };
  public appointment_status = ["progress", "pending", "completed"]

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit() {
    this.appointmentService.getAppointments()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments.filter(a => this.isDeleted( a.appointment_status));
        console.log(this.appointments);
        this.loading = false;
      },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
          this.loading = false;
        });
  }

  cancelAppointment(id: string) {
    this.appointmentService.cancelAppointment(id)
      .pipe(
        mergeMap(() => this.appointmentService.getAppointments())
      )
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments.filter(a => this.isDeleted( a.appointment_status));
        this.successMsg = 'Ati anulat programarea cu succes';
      },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        });
  }


isDeleted (status : string): boolean { 
    return (status !=  'deleted'); 
 } 
           

  viewResults(id: string){
    //redirect to results
    console.log('aicea')
    this.router.navigate(['tests-results/'+id]);
  
  }


  actionButton(status: string, id: string) {
    console.log('aicea2')
    switch (status) {
      case "progress": {
        break;
      }
      case "pending": {
        this.cancelAppointment(id);
        break;
      }
      case "completed": {
        //view test results; 
        this.viewResults(id);
        break;
      }
    }
  }
}
