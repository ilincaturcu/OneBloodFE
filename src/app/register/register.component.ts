import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { datePickerValidator } from '../datepicker-validator';
import { PacientService } from '../services/pacient.service';
import { Credentials, Pacient, PacientCredentials, personalInformation } from '../models/pacient.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fisaDonareControl: FormGroup;
  loginForm: FormGroup;
  pacientControl : FormGroup;
  sexes: string[];
  dateOfBirth: Date;
  minDate: Date;
  maxDate: Date;
  credentials: Credentials;
  pacient : Pacient;
  personalInfo : personalInformation;
  pacientCredentials : PacientCredentials;


  myDateFilter = (m: Date | null): boolean => {
    const day = m.getDay();
    return day !== 0 && day !== 6;
  }
  constructor(private fb: FormBuilder, private pacientService : PacientService) { }

  ngOnInit(): void {
    this.fisaDonareControl = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      surname: ['', [Validators.required, Validators.maxLength(15)]],
      identity_card_series: ['', [Validators.required,  Validators.minLength(2), Validators.maxLength(2)]],
      identity_card_number: ['', [Validators.required, Validators.min(0), Validators.minLength(6), Validators.maxLength(6)]],
      birthdate: ['', [Validators.required, datePickerValidator()]],
      age: ['', [Validators.required, Validators.min(18), Validators.maxLength(3)]],
      adress: ['', Validators.required],
      phone_number: ['', [Validators.required,Validators.min(0), Validators.minLength(10), Validators.maxLength(15)]],
      job: ['', Validators.required],
      sex: ['', Validators.required],
      mothers_name: [''],
      fathers_name: ['']
    });

    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });

    this.pacientControl = this.fb.group({
      cnp:['', [Validators.required,Validators.min(0), Validators.minLength(13), Validators.maxLength(13)]],
      self_exclusion_form_id: [0],
      donor_code:['IS00050654'],
      status:[''],
      created_at: [new Date().toLocaleString("se").split(" ")[0] ]
    })
    this.sexes = [
      'Feminin',
      'Masculin'
    ];

    console.log("edit ng on init ")


    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.fisaDonareControl.controls[controlName].hasError(errorName);
  }

  public loginHasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public pacientHasError = (controlName: string, errorName: string) => {
    return this.pacientControl.controls[controlName].hasError(errorName);
  }
  saveUserDetails() {
    console.log(this.loginForm.value);
    console.log(this.fisaDonareControl.value);
    this.credentials =this.loginForm.value;
    this.pacient = this.pacientControl.value;
    this.personalInfo = this.fisaDonareControl.value;
    console.log("save");
    console.log(this.credentials)
    console.log(this.pacient);
    console.log( this.personalInfo);
    this.pacientCredentials = new PacientCredentials(this.pacient, this.credentials, this.personalInfo);
    //this.pacientService.addCredentials(this.credentials).subscribe();
    this.pacientService.addPacientWithCredentials(this.pacientCredentials).subscribe();
  }

  
}
