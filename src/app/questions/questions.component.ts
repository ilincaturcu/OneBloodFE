import { Component, OnInit, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../services/questions.service';
import { Quiz, Answers, Choice, Question, Response } from '../models/quiz.model';
import { JwtClientService } from '../services/jwt-client.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  quiz: Quiz;
  answers: Answers;
  choices: Choice[];
  questions: Question[];
  currentQuestionIndex: number;

  showResults = false;

  // inject both the active route and the questions service
  constructor(private route: ActivatedRoute, public questionsService: QuestionsService, private jwtService : JwtClientService) {}

  ngOnInit() {

    var donorCode = this.jwtService.getDonorCode();
    this.questionsService.getQuestionsFemei()
      .subscribe((questions:Question[]) => {
        // initialize everything
        this.questions = questions;
       // console.log(this.questions.map( r=> new Question(r.question, r.choices)))
       var date = new Date().toLocaleString("se").split(" ")[0] ;
       date += "T22:00:00.000+00:00";
         this.answers = new Answers(date, donorCode);
         this.currentQuestionIndex = 0;
      });
  }

  updateChoice(choice: any) {
    if(this.questions[this.currentQuestionIndex].question_type === "YESNO")
    this.answers.responses[this.currentQuestionIndex] = new Response(this.currentQuestionIndex, choice.correct);
    else if(this.questions[this.currentQuestionIndex].question_type === "TEXTBOX")
   { this.answers.responses[this.currentQuestionIndex] = new Response(this.currentQuestionIndex, choice);
    console.log(choice)
  }
  else if(this.questions[this.currentQuestionIndex].question_type === "DATE")
   { this.answers.responses[this.currentQuestionIndex] = new Response(this.currentQuestionIndex, choice);
    console.log("DATE" + choice)
  }
  }

  nextOrViewResults() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showResults = true;
      return;
    }

    this.currentQuestionIndex++;
  }

  back() {
    if (this.currentQuestionIndex === this.questions.length - 1 || this.currentQuestionIndex === 0) {
      this.showResults = false;
      return;
    }

    this.currentQuestionIndex--;
  }
  reset() {
    this.questions = undefined;
    this.answers = undefined;
    this.currentQuestionIndex = undefined;
  }
}