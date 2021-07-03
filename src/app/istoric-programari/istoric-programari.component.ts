
import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment, PacientAppointment } from '../models/Appointment';
import { AppointmentService } from '../services/appointment.service';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PacientService } from '../services/pacient.service';
import { QuestionsService } from '../services/questions.service';
import { DonationForm } from '../models/donation-form.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-istoric-programari',
  templateUrl: './istoric-programari.component.html',
  styleUrls: ['./istoric-programari.component.scss']
})
export class IstoricProgramariComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public appointments: PacientAppointment[];
  totalElements;
  index=0;
  size=10;

 // public todayAppointmensInfo: PacientAppointment[];
  public columns = ['name', 'nickname','donor_code','day', 'hour', 'status', 'tests'];
  public button = { "progress": "", "pending": "Cancel", "completed": "Results" };
  public appointment_status = ["progress", "pending", "completed"]
  statuses=[
    {value: 'valid', viewValue: 'valid'},
    {value: 'suspendat', viewValue: 'suspendat'},
    {value: 'invalid', viewValue: 'invalid'}
  ];

  constructor(private appointmentService: AppointmentService, private router: Router, private pacientService : PacientService, private questionService : QuestionsService) { }

  async ngOnInit() {
    this.totalElements = await this.getNoOfAppointments();
    await this.appointmentService.getAllAppointmentsAndPacientsInfoPaginated(sessionStorage.getItem("DoctorCode").valueOf(), this.index, this.size)
    .subscribe((appointments: PacientAppointment[]) => {
      this.appointments = appointments;
     this.loading = false;

    });

  }
  async pageEvents(event: PageEvent) {
    const request = {};
    this.index = event.pageIndex;
    this.size = event.pageSize;
  await this.ngOnInit();
  }


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
           

 
 async viewResults(donor_code: string, appointmentDate: number, appId:number) {
  var tzoffset = (new Date(appointmentDate)).getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().split('T')[0];
  var id = await this.getDonationFormIdPromise(donor_code, localISOTime);
  if(id!= null)
  this.router.navigate(['tests-results-doctor/' + id +"/" + donor_code + "/post" + "/" + appId]);


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
    this.questionService.addStatus(event.value, donor_code).subscribe();
   // console.log("Status of " + donor_code + " has changed to " + event.value)
    if(event.value == "valid"){
     this.generateDonationForm(donor_code, appointment_date);
    }
  }


  generateDonationForm(donor_code:string, appointment_date : number){
    //verifica daca are deja unul pe azi, daca da => windows.alert, dara nu => genereaza
    var donationForm = new DonationForm(donor_code, '0', '0',appointment_date)
    this.appointmentService.generateDonationFormByDonorCode(donationForm).subscribe();
  }


  async applyFilter(filterValue: string) {

    //refresh
  if(filterValue==null){
    this.index = 0;
    this.size = 10;
    await this.ngOnInit();
    return;
  }

  //different endpoint for filtered and paginated appointments
  await this.appointmentService.getAllAppointmentsAndPacientsInfoPaginatedFiltered(sessionStorage.getItem("DoctorCode").valueOf(), 0, 10, filterValue)
  .subscribe((appointments: PacientAppointment[]) => {
    this.appointments = appointments;
   this.loading = false;
    this.totalElements = appointments.length;
  });
  }


  public getNoOfAppointments(): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        this.appointmentService.getNumberOfAppointmentsOfADoctor(sessionStorage.getItem("DoctorCode").valueOf()).subscribe(no =>resolve(no))
      }, 300)
    });
  }
}


