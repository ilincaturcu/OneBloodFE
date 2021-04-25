import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { datePickerValidator } from '../datepicker-validator';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-tests-results',
  templateUrl: './tests-results.component.html',
  styleUrls: ['./tests-results.component.scss']
})
export class TestsResultsComponent implements OnInit {
  fisaDonareControl: FormGroup;
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
   dateOfBirth: Moment;
   minDate: Moment;
   maxDate: Moment;
  
  myDateFilter = (m: Moment | null): boolean => {
    const day = (m || moment()).day();
    return day !== 0 && day !== 6;
  } 
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.fisaDonareControl = this.fb.group({
      lastName: ['',Validators.required, Validators.maxLength(20)],
      firstName: ['',Validators.required, Validators.maxLength(15)],
      serieBuletin:['',Validators.required, Validators.maxLength(2)],
      nrBuletin: ['',Validators.required, Validators.maxLength(6)],
      email:['',Validators.required, Validators.email],
      dateOfBirth:['',Validators.required, datePickerValidator()],
      age: ['',Validators.required, Validators.maxLength(3)],
      adress: ['',Validators.required],
      job: ['',Validators.required],
      sexes:  ['',Validators.required]

    });
    
    this.sexes = [
      'Feminin', 
      'Masculin'
    ];

    console.log("edit ng on init ")
  

  const currentYear = moment().year();
  this.minDate = moment([currentYear -1, 0, 1]);
  this.maxDate = moment([currentYear + 1, 11, 31]);
  
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.fisaDonareControl.controls[controlName].hasError(errorName);
  }
  


}
