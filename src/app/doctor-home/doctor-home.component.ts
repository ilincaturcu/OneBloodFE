

import { Component, OnInit } from '@angular/core';
import { Appointment, PacientAppointment } from '../models/Appointment';
import { AppointmentService } from '../services/appointment.service';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PacientService } from '../services/pacient.service';
import { QuestionsService } from '../services/questions.service';
import { DonationForm } from '../models/donation-form.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    let doctor_code;
    this.statusPacient = this.fb.group({
      status: ['']
    })
     if(sessionStorage.getItem("DoctorCode").valueOf()!=null){
     doctor_code = sessionStorage.getItem("DoctorCode").valueOf();
     }
    
    await this.appointmentService.getTodayAppointmentsAndPacientsInfo(doctor_code)
    .subscribe((appointments: PacientAppointment[]) => {
      this.appointments = appointments.filter(a => this.isDeleted( a.appointment.appointment_status));
    // this.appointments =  this.todayAppointmensInfo.map(a=> a.appointment);
     // console.log(this.getData());
     this.loading = false;
      console.log(this.appointments)
  
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
           

 
 async viewResults(donor_code: string, appointmentDate: number, appId: number) {
  console.log('aicea')
  var tzoffset = (new Date(appointmentDate)).getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().split('T')[0];
  var id = await this.getDonationFormIdPromise(donor_code, localISOTime);
  console.log("donation form id " + id);
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
    // var tzoffset = (new Date(appointment_date)).getTimezoneOffset() * 60000; //offset in milliseconds
    // var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().split('T')[0];
    // if(this.getDonationFormIdPromise(donor_code, localISOTime)!= null){
    //   window.alert("Pacientul are deja o fisa de donare pentru astazi");
    // }else{
      //TODO: ADAUGAT LOGICA SA NU POATE FACE 2 DONATION FORM PENTRU ACEEASI ZI
      this.questionService.addStatus(event.value, donor_code).subscribe();
      console.log("Status of " + donor_code + " has changed to " + event.value)
      if(event.value == "valid"){
       this.generateDonationForm(donor_code, appointment_date);
      }

    
  }


  generateDonationForm(donor_code:string, appointment_date : number){
      var donationForm = new DonationForm(donor_code, '0', '0',appointment_date)
      this.appointmentService.generateDonationFormByDonorCode(donationForm).subscribe();
  }
}
