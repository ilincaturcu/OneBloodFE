import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  diaplyedMessage = {};
  public loading = true;
  public errorMsg: string;
  public successMsg: string;

  constructor(public questionsService: QuestionsService, private jwtService: JwtClientService, private router: Router) { }
  async ngOnInit() {
    this.donor_code = this.jwtService.getDonorCode();
    this.questionsService.addResponses(this.answers).subscribe((status) => {
      this.status = status;
      this.questionsService.addStatus(this.status, this.donor_code).subscribe();
      this.loading = false;
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
      this.loading = false;
    });
    (await this.questionsService.addResponseIdToPacient()).subscribe();
  }


  redirectProgramare(){
    this.router.navigate(['/programare']);
  }
}
