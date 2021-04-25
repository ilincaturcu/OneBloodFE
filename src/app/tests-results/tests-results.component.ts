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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
