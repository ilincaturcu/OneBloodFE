import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../services/questions.service';
import { Answers, Question } from '../models/quiz.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() answers: Answers;
  @Input() questions: Question[];
  status: string
  donor_code = "IS00050654";
  constructor(public questionsService: QuestionsService) { }
  ngOnInit() {
    // this.questionsService.getQuestions()
    //   .subscribe(questions => {
    //     this.questions = questions;

    //   });
    console.log(this.answers)
    this.questionsService.addResponses(this.answers).subscribe((status) => {
      this.status = status;
      console.log("status " + this.status)
      this.questionsService.addStatus(this.status, this.donor_code).subscribe();;
     }
    );

  }

  // getIshResults(){
  //   this.answers.values.filter(choice => choice.correct == 'ish')
  // }
}
