

import { Component, OnInit } from '@angular/core';
import { Appointment, PacientAppointment } from '../models/Appointment';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';
import { QuestionsService } from '../services/questions.service';
import { DonationForm } from '../models/donation-form.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
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
  statusPacient: FormGroup;
  doctor_code;

  public columns = ['name', 'nickname','donor_code', 'hour', 'status','changeStatus', 'tests', 'cancel'];
  public button = { "progress": "", "pending": "Cancel", "completed": "Results" };
  public appointment_status = ["progress", "pending", "completed"]
  statuses=[
    {value: 'valid', viewValue: 'valid'},
    {value: 'suspendat', viewValue: 'suspendat'},
    {value: 'invalid', viewValue: 'invalid'}
  ];

  constructor(private appointmentService: AppointmentService, private router: Router,  private questionService : QuestionsService, private fb: FormBuilder){}

  async ngOnInit() {

    this.statusPacient = this.fb.group({
      status: ['']
    })
     if(sessionStorage.getItem("DoctorCode").valueOf()!=null){
     this.doctor_code = sessionStorage.getItem("DoctorCode").valueOf();
     }
    
    await this.appointmentService.getTodayAppointmentsAndPacientsInfo(this.doctor_code)
    .subscribe((appointments: PacientAppointment[]) => {
      this.appointments = appointments.filter(a => this.isDeleted( a.appointment.appointment_status));
     this.loading = false;
    });
  }



  async cancelAppointment(id: string) {
    this.appointmentService.cancelAppointment(id)
    .pipe(
      mergeMap(() => this.appointmentService.getTodayAppointmentsAndPacientsInfo(this.doctor_code))
    )
    .subscribe((appointments: PacientAppointment[]) => {
      this.appointments = appointments.filter(a => this.isDeleted( a.appointment.appointment_status));
     
    },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
}
  


isDeleted (status : string): boolean { 
    return (status !=  'deleted' && status != 'completed'); 
 } 
           

 
 async viewResults(donor_code: string, appointmentDate: number, appId: number) {
  var tzoffset = (new Date(appointmentDate)).getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().split('T')[0];
  var id = await this.getDonationFormIdPromise(donor_code, localISOTime);
  if(id!= null)
  this.router.navigate(['tests-results-doctor/' + id +"/" + donor_code + "/pre" + "/" + appId]);


}


public getDonationFormIdPromise(donor_code, appointmentDate): Promise<DonationForm> {
  return new Promise<DonationForm>((resolve) => {
    setTimeout(() => {
      this.appointmentService.getDonationFormByDonorCodeAndDate(donor_code, appointmentDate).subscribe((r )=> 
      {
        if(r!=null) resolve(r.donation_form_id);
        else  window.alert("Pacientul nu are fisa de donare generata");
      });
    }, 100)
  });
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

  changeStatus(event: any, donor_code: string, appointment_date:number){
      //TODO: ADAUGAT LOGICA SA NU POATE FACE 2 DONATION FORM PENTRU ACEEASI ZI
      this.questionService.addStatus(event.value, donor_code).subscribe();
     // console.log("Status of " + donor_code + " has changed to " + event.value)
      if(event.value == "valid"){
       this.generateDonationForm(donor_code, appointment_date);
      }
  }


  generateDonationForm(donor_code:string, appointment_date : number){
      var donationForm = new DonationForm(donor_code, '0', '0',appointment_date)
      this.appointmentService.generateDonationFormByDonorCode(donationForm).subscribe();
  }
}
