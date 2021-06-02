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
  constructor(private route: ActivatedRoute, public questionsService: QuestionsService, private jwtService: JwtClientService) { }

  async ngOnInit() {

    var donorCode = this.jwtService.getDonorCode();



    //if F else M
    const gender = await this.checkGender();
    console.log(gender)
    if (gender == "Feminin") {
      this.questionsService.getQuestionsFemei()
        .subscribe((questions: Question[]) => {
          this.questions = questions;
          var date = new Date().toISOString().split('T')[0]
          date += "T22:00:00.000+00:00";
          this.answers = new Answers(date, donorCode);
          this.currentQuestionIndex = 0;
        });
    }
    else {
      this.questionsService.getQuestionsBarbati()
        .subscribe((questions: Question[]) => {
          this.questions = questions;
        var date = new Date().toISOString().split('T')[0]
          console.log(date);
          date += "T22:00:00.000+00:00";
          this.answers = new Answers(date, donorCode);
          this.currentQuestionIndex = 0;
        });
    }

  }


  public checkGender(): Promise<any> {
    return new Promise<any>((resolve) => {
      setTimeout(async () => {
        (await this.jwtService.getDonorGender()).subscribe(gender => resolve(gender))
      }, 300)
    });
  }



  updateChoice(choice: any) {
    if (this.questions[this.currentQuestionIndex].question_type === "YESNO")
      this.answers.responses[this.currentQuestionIndex] = new Response(this.questions[this.currentQuestionIndex].question_number, choice.correct);
    else if (this.questions[this.currentQuestionIndex].question_type === "TEXTBOX") {
      this.answers.responses[this.currentQuestionIndex] = new Response(this.questions[this.currentQuestionIndex].question_number, choice);
      console.log(choice)
    }
    else if (this.questions[this.currentQuestionIndex].question_type === "DATE") {
      this.answers.responses[this.currentQuestionIndex] = new Response(this.questions[this.currentQuestionIndex].question_number, choice);
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