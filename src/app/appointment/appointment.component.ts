
import { AppointmentService } from '../services/appointment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { JwtClientService } from '../services/jwt-client.service';
import { PacientService } from '../services/pacient.service';

const options = {
  title: 'Finalizare programare',
  message: 'Veți primi un email cu toate informațiile despre programarea realizată.',
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
  hoursForm: FormGroup;
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
  emailAdress: string;


  @ViewChild('datePicker', { static: true }) datePicker: MatDatepicker<Date>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private appointmentService: AppointmentService,
    private jwtService: JwtClientService,
    private pacientService: PacientService
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

  pickdoctor(doctor) {
    this.doctor = doctor;
    this.selectedDoctor = this.doctors.find(d => d.name === doctor).doctor_code;
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
    this.fetchHours();
    if (this.dayForm.invalid) {
      return;
    } else {
      this.stepCounter = 3;
    }
  }

  submithour() {
    this.hourPicked = true;
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
    var i = 0;
    const tomorrow = new Date(firstDate)
    tomorrow.setDate(tomorrow.getDate())

    for (var currentDate = new Date(tomorrow); i <= noOfDays; currentDate.setDate(currentDate.getDate() + 1)) {
      if (currentDate.getDay() != 0 && currentDate.getDay() != 6) {
        var newDate = new Date(currentDate).toISOString().split('T')[0];
        //daca in acea zi nu mai este niciun slot liber
        if (this.appointmentService.getFreeHoursForAppointment(this.selectedDoctor, newDate).subscribe() != null)
          this.days.push(newDate);
        i += 1;
      }
    }
  }

  fetchDoctors() {
    this.appointmentService.getDoctors().subscribe((doctors) => {
      this.doctors = doctors
    }
    )
  }

  fetchHours() {
    this.appointmentService.getFreeHoursForAppointment(this.selectedDoctor, this.selectedDay).subscribe(hours =>
      this.hours = hours)
  }


  public openDialog(options) {
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
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
      return res;
    }
    ));
  }

  async sendMail() {
    var donorCode = this.jwtService.getDonorCode();
    var emailContent = `Ați realizat cu succes o programare la centrul de Transfuzii Iași la data de ${this.selectedDay},  ora ${this.selectedHour}. Pentru a afla mai multe informații accesați prima pagină de pe platformă sau ne puteți contacta la numărul 0332 408 329. Vă sugerăm să mâncați bine și să beți multe lichide în ziua donării. O zi frumoasă! `;
    var accountId = await this.getAccountId(donorCode);
    this.emailAdress = await this.getMail(accountId);
    this.appointmentService.sendMailAfterApp(emailContent, this.emailAdress.toString()).subscribe();
  }



  public getAccountId(donorCode): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        this.pacientService.getAccountIdAdressByDonorCode(donorCode).subscribe(id => resolve(id));
      }, 300)
    });
  }



  public getMail(accountId): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        this.pacientService.getEmailAdressByAccountId(accountId).subscribe(mail => resolve(mail));
      }, 300)
    });
  }

  async sendRequest() {

    var donorCode = this.jwtService.getDonorCode();
    this.appointmentService.postAppointment(donorCode, this.selectedDoctor, this.selectedDay, this.selectedHour).subscribe();
    await this.sendMail();
    this.openDialog(options);
    this.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.router.navigate(['/home']);
      }
    });
    this.router.navigate(['/home']);

  }

}

