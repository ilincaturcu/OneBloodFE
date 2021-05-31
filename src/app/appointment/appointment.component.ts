
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/Appointment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

const options = {
  title: 'Finalizare programare',
  message: 'Veti primi un email cu toate informatiile',
  cancelText: '',
  confirmText: 'ok'
};


interface Hour {
  value: string;
  viewValue: string;
}

interface Day {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})

export class AppointmentComponent implements OnInit {
  doctorForm: FormGroup;
  dayForm: FormGroup;
  hoursForm:FormGroup;
  doctor;
  doctors = [];
  day;
  days = [];
  hours = [];
  doctorSubmitted = false;
  daySubmitted = false;
  stepCounter = 1;
  selectedDoctor;
  selectedDay;
  selectedHour;
  selectedDoctorDetails;
  date: string;
  hour: string;
  datePicked = false;
  hourPicked = false;
  requestSent = false;
  visitsCount;
  hoursList;
  dialogRef: MatDialogRef<DialogComponent>;


  @ViewChild('datePicker', {static: true}) datePicker: MatDatepicker<Date>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private appointmentService : AppointmentService
  ) {
    this.renderer.addClass(document.body, 'landing1');
  }

  ngOnInit() {
    this.days = []
   
    this.fetchDoctors();
    this.doctorForm = this.formBuilder.group({
      doctor: ['', Validators.required]
    });
    this.dayForm = this.formBuilder.group({
      day: ['', Validators.required]
    });
    this.hoursForm = this.formBuilder.group({
      hour: ['', Validators.required]
    });
  }

  // ngOnDestroy() {
  //   // unsubscribe to ensure no memory leaks
  //   this.currentUserSubscription.unsubscribe();
  // }

  pickdoctor(doctor) {
    this.doctor = doctor;
    this.selectedDoctor = this.doctors.find(d=>d.name === doctor).doctor_code;
   console.log(doctor);
 
  }

  pickday(day) {
    this.day = day;
    this.selectedDay = day;
  }

  submitdoctor() {
    this.doctorSubmitted = true;
    this.getNextBusinessDays();
    if (this.doctorForm.invalid) {
      return;
    } else {
      this.stepCounter = 2;
    }
  }

  
  pickHour(hour) {
    this.hour = hour;
    this.selectedHour = hour;
    this.hourPicked = true;
    this.requestSent = false;
  }

  submitday() {
    this.daySubmitted = true;
    console.log(this.day);
    console.log(new Date(this.day).getTime())
    this.fetchHours();
    if (this.dayForm.invalid) {
      return;
    } else {
      this.stepCounter = 3;
    }
  }

  submithour() {
    this.hourPicked = true;
    console.log(this.hour)
    if (this.hoursForm.invalid) {
      return;
    } else {
      this.stepCounter = 4;
    }
  }

  get f() {
    return this.doctorForm.controls;
  }

  get g() {
    return this.dayForm.controls;
  }

  //generare zile lucratoare
  getNextBusinessDays() {
    const firstDate = Date.now();
    const noOfDays = 12;
    var i=0;
    for (var currentDate = new Date(firstDate); i <= noOfDays; currentDate.setDate(currentDate.getDate() + 1)) {
      if (currentDate.getDay() != 0 && currentDate.getDay() != 6) {
        var newDate = new Date(currentDate).toLocaleString("se").split(" ")[0];
        this.days.push(newDate);
        i+=1;
      }
    }
  }


  fetchDoctors(){
    this.appointmentService.getDoctors().subscribe((doctors)=>{ 
      this.doctors = doctors
      console.log(this.doctors)
    }
    )
  }

  fetchHours(){
    this.appointmentService.getFreeHoursForAppointment(this.selectedDoctor, this.selectedDay).subscribe(hours=>
      this.hours = hours)
  }


  public openDialog(options){
    this.dialogRef = this.dialog.open(DialogComponent, {    
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
 });
  }

  public confirmed(): Observable<any> {
    console.log('daaa')
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }
  sendRequest() {

    this.appointmentService.postAppointment('IS00050653', this.selectedDoctor, this.selectedDay, this.selectedHour).subscribe();
    console.log('IS00050653' + this.selectedDoctor + " " + this.selectedDay + " " + this.selectedHour);
    this.openDialog(options);
    this.confirmed().subscribe(confirmed => {
      if (confirmed) {
        //do something if confirmed is true
        console.log('confirmed')
        this.router.navigate(['/home']);
      }
   });
    this.router.navigate(['/home']);


    // if (this.currentUser) {
    //   this.visitsCount++;
    //   // console.log(this.visitsCount);
    //   const foundIndex = this.hoursList.findIndex(x => x._id === this.selectedDoctorDetails._id);
    //   const doctorName = this.hoursList[foundIndex].firstName + ' ' + this.hoursList[foundIndex].lastName;
    //   const patientName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
    //   // console.log(doctor);
    //   this.currentUser.visits.push({
    //     date: this.request.date,
    //     id: this.visitsCount,
    //     doctorName,
    //     patientName,
    //     patientId: this.currentUser._id,
    //     hour: this.request.hour,
    //     status: this.request.status,
    //     doctorId: this.selectedDoctorDetails._id
    //   });
    //   this.selectedDoctorDetails.visits.push({
    //     date: this.request.date,
    //     id: this.visitsCount,
    //     patientName,
    //     patientId: this.currentUser._id,
    //     doctorName,
    //     hour: this.request.hour,
    //     status: this.request.status,
    //     doctorId: this.selectedDoctorDetails._id,
    //     read: false
    //   });
    //   this.userService.update(this.currentUser).subscribe(data => {
    //     localStorage.setItem('currentUser', JSON.stringify(data));
    //   });
    //   this.userService.update(this.selectedDoctorDetails).subscribe();
    //   this.requestSent = true;
    //   this.alertService.success('Request has been sent! Waiting for confirmation.', false);
    // } else {
    //   this.dialog.open(NotLoggedComponent);
    // }
  }

}

