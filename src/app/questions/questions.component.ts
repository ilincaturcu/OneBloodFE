import { Component, OnInit, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../questions.service';
import { Quiz, Answers, Choice, Question } from '../quiz.model';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  quiz: Quiz;
  answers: Answers;
  questions: Question[];
  currentQuestionIndex: number;

  showResults = false;

  // inject both the active route and the questions service
  constructor(private route: ActivatedRoute, public questionsService: QuestionsService) {}

  ngOnInit() {

    // read from the dynamic route and load the proper quiz data
    this.questionsService.getQuestions()
      .subscribe(questions => {
        // initialize everything
        this.questions = questions;
        this.answers = new Answers();
        this.currentQuestionIndex = 0;
      });
  }

  updateChoice(choice: Choice) {
    this.answers.values[this.currentQuestionIndex] = choice;
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