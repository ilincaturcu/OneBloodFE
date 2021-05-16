import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Question } from '../models/quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() question: Question;
  @Output() onChoiceMade = new EventEmitter<string>();

  private form: FormGroup;
  constructor(private fb: FormBuilder){};

  ngOnInit() {
    this.form = this.fb.group({
      choice:''
    });
    this.form.valueChanges.subscribe(this.onChange);
  }

  onChange = () => {
    this.onChoiceMade.emit(this.form.value.choice);
  }
}
