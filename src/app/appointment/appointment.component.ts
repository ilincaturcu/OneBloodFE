
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/Appointment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';




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

export class AppointmentComponent implements OnInit, OnDestroy {
  doctorForm: FormGroup;
  dayForm: FormGroup;
  hoursForm:FormGroup;
  doctor;
  doctors;
  day;
  days = ['2021-05-16','2021-05-16','2021-05-16'];
  hours = [ '11:00', '12:00','13:00'];
  doctorSubmitted = false;
  daySubmitted = false;
  stepCounter = 1;
  calendarClicked = false;
  currentUserSubscription: Subscription;
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
  avHours = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  request = {doctorId: 1, date: 'a', hour: 'b', status: 'c'};


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
    this.renderer.removeClass(document.body, 'landing2');
    this.renderer.addClass(document.body, 'landing1');
    // this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
    //   this.currentUser = user;
    //   if (this.currentUser && this.currentUser.userType === 'Doctor') {
    //     this.router.navigate([`${AppRouterLinks.HOME}`]);
    //   }
    // });
  }

  ngOnInit() {
    this.fetchhours();
    this.fetchDoctors();
    this.uniqueCities();
    this.visitsCounter();
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

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = moment((event.value.toLocaleDateString()), 'DD.MM.YYYY').format('DD.MM.YYYY');
    // console.log(this.date);
    this.datePicked = true;
    this.calendarClicked = false;
  }

  // shows specialties based on original cities
  uniqueCities() {
    // if (this.hoursList && this.hoursList.length > 0) {
    //   const unique = this.hoursList.map(s => s.doctor).filter((e, i, a) => a.indexOf(e) === i);
    //   return unique;
    // } else {
    //   return ['Not Found!'];
    // }
  }

  pickdoctor(doctor) {
    this.doctor = doctor;
    this.selectedDoctor = doctor;
   console.log(doctor);
  }

  
  pickday(day) {
    this.day = day;
    this.selectedDay = day;
  }

  submitdoctor() {
    this.doctorSubmitted = true;
    if (this.doctorForm.invalid) {
      return;
    } else {
      this.stepCounter = 2;
    }
  }

  
  pickHour(hour) {
    this.hour = hour;
    this.selectedHour = hour;
    this.request.date = this.date;
    this.request.hour = this.hour;
   // this.request.status = 'pending';
    this.hourPicked = true;
    this.requestSent = false;
  }

  submitday() {
    this.daySubmitted = true;
    console.log(this.day);
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


  imgPath() {
    // for (let i = 0; i < this.hours.length; i++) {
    //   return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
    //     + this.hours[i].profilePic);
    // }
  }


  get f() {
    return this.doctorForm.controls;
  }

  get g() {
    return this.dayForm.controls;
  }

  visitsCounter() {
  // this.userService.getAll().pipe(first()).subscribe(users => {
  //   if (users.map(e => e.visits).length > 0) {
  //     this.visitsCount = users.map(e => e.visits).reduce((a, b) => [...a, ...b]).length;
  //   } else {
  //     this.visitsCount = 1; }
  //     }
  //   );
  }



  fetchhours() {
    // this.userService.getAll().subscribe(hours => {
    //   this.hoursList = hours.filter(e => e.userType === 'Doctor');
    //   // console.log(this.hoursList);
    // });
  }

  fetchDoctors(){
    this.appointmentService.getDoctors().subscribe((doctors)=>{ 
      this.doctors = doctors
    }
    )
  }

  sendRequest() {
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

  // getRating(doctor) {
  //   if (doctor.rating === undefined) {
  //     return 0;
  //   } else {
  //   return doctor.rating * 20;
  //   }
  // }

  // clearAlert() {
  //   this.alertService.clearAlert();
  // }
}


// export class AppointmentComponent implements OnInit {

//   appointmentForm: FormGroup;
//   public successMsg: string;
//   public errorMsg: string;
//   appointmentDate: string;
//   name: string;
//   email: string;

//   hours: Hour[] = [
//     {value: '10', viewValue: '10:00'},
//     {value: '11', viewValue: '11:00'},
//     {value: '12', viewValue: '12:00'}
//   ];

//   days: Day[] = [
//     {value: '2021-05-16', viewValue: '2021-05-16'},
//     {value: '2021-05-16', viewValue: '2021-05-16'},
//     {value: '2021-05-16', viewValue: '2021-05-16'}
//   ];
//   constructor(private appointmentService: AppointmentService, private fb: FormBuilder) { }

//   ngOnInit() {
//     this.appointmentForm = this.fb.group({
      
//       name: ['',[Validators.required, Validators.maxLength(35)]],
//       email:['',Validators.required, Validators.email],
//       hours:'',
//       days:''
//     })
//   }

//   createAppointment() {
//     this.successMsg = '';
//     this.errorMsg = '';
//     this.appointmentService.createAppointment(this.appointmentDate, this.name, this.email)
//       .subscribe((createdAppointment: Appointment) => {
//         this.appointmentDate = '';
//         this.name = '';
//         this.email = '';
//         const appointmentDate = new Date(createdAppointment.appointmentDate).toDateString();
//         this.successMsg = `Appointment Booked Successfully for ${appointmentDate}`;
//       },
//       (error: ErrorEvent) => {
//         this.errorMsg = error.error.message;
//       });
//   }

// }
