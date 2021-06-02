

import { Component, OnInit } from '@angular/core';
import { Appointment, PacientAppointment } from '../models/Appointment';
import { AppointmentService } from '../services/appointment.service';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PacientService } from '../services/pacient.service';
import { QuestionsService } from '../services/questions.service';
@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.scss']
})
export class DoctorHomeComponent implements OnInit {

  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public appointments: PacientAppointment[];

 // public todayAppointmensInfo: PacientAppointment[];
  public columns = ['name', 'nickname','donor_code', 'hour', 'status','changeStatus', 'tests', 'cancel'];
  public button = { "progress": "", "pending": "Cancel", "completed": "Results" };
  public appointment_status = ["progress", "pending", "completed"]
  statuses=[
    {value: 'valid', viewValue: 'valid'},
    {value: 'suspendat', viewValue: 'suspendat'},
    {value: 'invalid', viewValue: 'invalid'}
  ];

  constructor(private appointmentService: AppointmentService, private router: Router, private pacientService : PacientService, private questionService : QuestionsService) { }

  async ngOnInit() {

    await this.appointmentService.getTodayAppointmentsAndPacientsInfo('891750')
    .subscribe((appointments: PacientAppointment[]) => {
      this.appointments = appointments.filter(a => this.isDeleted( a.appointment.appointment_status));
    // this.appointments =  this.todayAppointmensInfo.map(a=> a.appointment);
     // console.log(this.getData());
     this.loading = false;
      console.log(this.appointments)
    //  console.log(this.todayAppointmensInfo)});
    });
   

      
      // public getQuestionsFemei() {
      //   return this.http.get(`./assets/chestionar-femei.json`).pipe(
      //     map((result: any[]) => {
      //       return result.map(r => new Question(r.question, r.choices, r.question_type, r.question_number));
      //     })
      //   );
      // }
    // this.appointmentService.getDoctorsAppointments('891750')
    //   .subscribe((appointments: Appointment[]) => {
    //     this.appointments = appointments.filter(a => this.isDeleted( a.appointment_status));
       
    //     this.loading = false;
    //   },
    //     (error: ErrorEvent) => {
    //       this.errorMsg = error.error.message;
    //       this.loading = false;
    //     });
  }


  // public getData(): Appointment[]{
  //  return this.appointments.map(a=>
  //     new Appointment(a.appointment.appointment_date, a.appointment.appointment_hour, a.appointment.appointment_id, a.appointment.appointment_status, a.appointment.fk_doctor_code, a.appointment.fk_donor_code));
  // }
  cancelAppointment(id: string) {
    // this.appointmentService.cancelAppointment(id)
    //   .pipe(
    //     mergeMap(() => this.appointmentService.getAppointments())
    //   )
    //   .subscribe((appointments: PacientAppointment[]) => {
    //     this.appointments = appointments.filter(a => this.isDeleted( a.appointment.appointment_status));
    //     this.successMsg = 'Ati anulat programarea cu succes';
    //   },
    //     (error: ErrorEvent) => {
    //       this.errorMsg = error.error.message;
    //     });
  }


isDeleted (status : string): boolean { 
    return (status !=  'deleted'); 
 } 
           

  viewResults(id: string){
    this.router.navigate(['tests-results/'+id]);
  }


  actionButton(status: string, id: string) {
    switch (status) {
      case "progress": {
        break;
      }
      case "pending": {
        this.cancelAppointment(id);
        break;
      }
      case "completed": {
        break;
      }
    }
  }


  changeStatus(event: any, donor_code: string){
    this.questionService.addStatus(event.value, donor_code).subscribe();
    console.log("Status of " + donor_code + " has changed to " + event.value)
    if(event.value == "valid"){
      //create donation form with appointment date as create_at
    }
  }
}
