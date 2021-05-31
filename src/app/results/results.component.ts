import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../services/questions.service';
import { Answers, Question } from '../models/quiz.model';
import { JwtClientService } from '../services/jwt-client.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() answers: Answers;
  @Input() questions: Question[];
  status: string
  donor_code ;
  constructor(public questionsService: QuestionsService, private jwtService: JwtClientService) { }
  async ngOnInit() {
    // this.questionsService.getQuestions()
    //   .subscribe(questions => {
    //     this.questions = questions;

    //   });

    this.donor_code = this.jwtService.getDonorCode();
    console.log(this.donor_code + " donor code")
    console.log(this.answers)
    this.questionsService.addResponses(this.answers).subscribe((status) => {
      this.status = status;
      console.log("status " + this.status)
      this.questionsService.addStatus(this.status, this.donor_code).subscribe();
     
     }
    );
    (await this.questionsService.addResponseIdToPacient()).subscribe();
  }

  // getIshResults(){
  //   this.answers.values.filter(choice => choice.correct == 'ish')
  // }
}
