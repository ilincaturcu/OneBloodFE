import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { datePickerValidator } from '../datepicker-validator';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fisaDonareControl: FormGroup;
  loginForm: FormGroup;
  sexControl: FormControl;
  // selectTasksControl: FormControl;
  // tasksControl: FormControl;
  sexes: string[];
  // tasks: string[];
  // name: string;
  // lname: string;
  // adress: string;
  // fname: string;
  // email: string;
  // numarBuletin: string;
  // serieBuletin: string;
  // age: number;
  // sex: string;
  // job : string;
  // id_voluntar: number;
  // created_at: string;
  // tasks_ids: number[];
  dateOfBirth: Date;
  minDate: Date;
  maxDate: Date;

  myDateFilter = (m: Date | null): boolean => {
    const day = m.getDay();
    return day !== 0 && day !== 6;
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fisaDonareControl = this.fb.group({
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      firstName: ['', [Validators.required, Validators.maxLength(15)]],
      serieBuletin: ['', [Validators.required, Validators.maxLength(2)]],
      nrBuletin: ['', [Validators.required, Validators.maxLength(6)]],
      dateOfBirth: ['', [Validators.required, datePickerValidator()]],
      age: ['', [Validators.required, Validators.maxLength(3)]],
      adress: ['', Validators.required],
      job: ['', Validators.required],
      sexes: ['', Validators.required]

    });

    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });

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

  saveUserDetails() {
    console.log(this.loginForm.value);
    console.log(this.fisaDonareControl.value);
  }

  
}
