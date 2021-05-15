import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../questions.service';
import { Answers, Question } from '../quiz.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() answers: Answers;
  @Input() questions: Question[];
  status : string

  constructor(public questionsService: QuestionsService) { }
  ngOnInit() {
    // this.questionsService.getQuestions()
    //   .subscribe(questions => {
    //     this.questions = questions;

    //   });
    console.log(this.answers)
   this.questionsService.addResponses(this.answers).subscribe(r=> this.status = r);
  }

  // getIshResults(){
  //   this.answers.values.filter(choice => choice.correct == 'ish')
  // }
}
