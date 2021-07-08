import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { datePickerValidator } from '../datepicker-validator';
import { PacientService } from '../services/pacient.service';
import { Credentials, Pacient, PacientCredentials, personalInformation } from '../models/pacient.model';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fisaDonareControl: FormGroup;
  loginForm: FormGroup;
  pacientControl: FormGroup;
  sexes: string[];
  dateOfBirth: Date;
  minDate: Date;
  maxDate: Date;
  credentials: Credentials;
  pacient: Pacient;
  personalInfo: personalInformation;
  pacientCredentials: PacientCredentials;
  newID = 'IS' + nanoid(8);
  statusDefault = 'pending';
  invalid1 = false;
  invalid2 = false;
  invalid3 = false;


  myDateFilter = (m: Date | null): boolean => {
    const day = m.getDay();
    return day !== 0 && day !== 6;
  }
  constructor(private fb: FormBuilder, private pacientService: PacientService, private router: Router) {

  }

  ngOnInit(): void {


    this.fisaDonareControl = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z- ]*$')]],
      surname: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z- ]*$')]],
      identity_card_series: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      identity_card_number: ['', [Validators.required, Validators.min(0), Validators.minLength(6), Validators.maxLength(6)]],
      birthdate: ['', [Validators.required, datePickerValidator()]],
      age: ['', [Validators.required, Validators.min(18), Validators.maxLength(3)]],
      adress: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.min(0), Validators.minLength(10), Validators.maxLength(15)]],
      job: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      sex: ['', Validators.required],
      mothers_name: ['', Validators.pattern('^[a-zA-Z ]*$')],
      fathers_name: ['', Validators.pattern('^[a-zA-Z ]*$')]
    });

    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });

    this.pacientControl = this.fb.group({
      cnp: ['', [Validators.required, Validators.min(0), Validators.minLength(13), Validators.maxLength(13)]],
      self_exclusion_form_id: [0],
      donor_code: [this.newID],
      status: [this.statusDefault],
      created_at: [new Date().toISOString().split('T')[0]]
    })

    this.sexes = [
      'Feminin',
      'Masculin'
    ];


    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.fisaDonareControl.controls[controlName].hasError(errorName);
  }

  public loginHasError = async (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public pacientHasError = (controlName: string, errorName: string) => {
    return this.pacientControl.controls[controlName].hasError(errorName);
  }

  getFormValidationErrors() {
    this.invalid1 = false;
    this.invalid2 = false;
    this.invalid3 = false;
    let pacientControlErrors: ValidationErrors = null;
    let fisaDonareControlErrors: ValidationErrors = null;
    let loginFormErrors: ValidationErrors = null;
    Object.keys(this.fisaDonareControl.controls).forEach(key => {
      fisaDonareControlErrors = this.fisaDonareControl.get(key).errors;
      if (fisaDonareControlErrors != null) {
          this.invalid1 = true;
      }
    });
    if (fisaDonareControlErrors == null) {
      this.invalid1 = false;
    }
    Object.keys(this.pacientControl.controls).forEach(key => {
      pacientControlErrors = this.pacientControl.get(key).errors;
      if (pacientControlErrors != null) {
          this.invalid2 = true;
      }
    });

    Object.keys(this.loginForm.controls).forEach(key => {
      loginFormErrors = this.loginForm.get(key).errors;
      if (loginFormErrors != null) {
          this.invalid3 = true;
      }
    });
    if (pacientControlErrors == null) {
      this.invalid3 = false;
    }

  }

  async saveUserDetails() {
    await this.getFormValidationErrors();
    if (this.invalid1 != true && this.invalid2 != true && this.invalid3 != true) {
      console.log(this.invalid1);
      console.log(this.invalid2);
      console.log(this.invalid3);

      //validate email does not exist in the system
      var account = await this.emailAlredyExists(this.loginForm.controls['email'].value);
      if (account.toString() == 'false') {
        this.credentials = this.loginForm.value;
        this.pacient = this.pacientControl.value;
        this.personalInfo = this.fisaDonareControl.value;
        this.pacientCredentials = new PacientCredentials(this.pacient, this.credentials, this.personalInfo);
        this.pacientService.addPacientWithCredentials(this.pacientCredentials).subscribe();
        window.alert('Cont creat cu succes. Veți primi un email cu toate informațiile. Următorul pas este să vă logați.')
        var emailContent = "Ați creat cu succes un nou cont pe platforma OneBlood. Următorul pas este să completați chestionarul de autoexcludere și apoi să realizați o programare.";
        this.pacientService.sendMailAfterApp(emailContent, this.loginForm.controls['email'].value).subscribe();
        this.router.navigate(['/login'])
      }
      else
        window.alert('Există deja un cont asociat email-ului ales!')
    }
    else return;
  }


  public emailAlredyExists(email): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        this.pacientService.doesTheEmailHasAnAccount(email).subscribe(flag => resolve(flag))
      }, 300)
    });
  }

  autoIncrementPacientId(): string {
    var lastPacientId;
    var kmsStr;
    this.pacientService.getLastDonorID().subscribe((id) => {

      lastPacientId = id;
      let increasedNum = Number(lastPacientId.replace('IS', '')) + 1;
      kmsStr = lastPacientId.substr(0, 2);
      for (let i = 0; i < 8 - increasedNum.toString().length; i++) {
        kmsStr = kmsStr + '0';
      }
      kmsStr = kmsStr + increasedNum.toString();


    });
    return kmsStr;
  }


}
