import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Question, Answers } from '../models/quiz.model';
import { JwtClientService } from './jwt-client.service';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { baseUrlMongo, baseUrlSql } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  token = "";
  data;

  constructor(private http: HttpClient, private JwtService: JwtClientService) {
    this.token = JwtService.getToken();
  }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }) };
  httpOptions2 = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' }), responseType: 'text' as 'json' };


  public getQuestionsFemei() {
    return this.http.get(`./assets/chestionar-femei.json`).pipe(
      map((result: any[]) => {
        return result.map(r => new Question(r.question, r.choices, r.question_type, r.question_number));
      })
    );
  }

  public getQuestionsBarbati() {
    return this.http.get(`./assets/chestionar-barbati.json`).pipe(
      map((result: any[]) => {
        return result.map(r => new Question(r.question, r.choices, r.question_type, r.question_number));
      })
    );
  }
  public getQuestionsMongo(): Observable<any> {

    var response = this.http.get(`${baseUrlMongo}api/questions`, { responseType: 'json' }).pipe(
      map((result: Question[]) => {
        result.map(r => new Question(r.question, r.choices, r.question_type, r.question_number));
      })
    );;

    return response;
  }

  public addResponses(answers: Answers): Observable<any> {

    return this.http.post<Answers>(`${baseUrlMongo}api/response`, answers, this.httpOptions2);
  }

  public getMostRecentResponseID(donor_code): Promise<any> {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        this.http.get(`${baseUrlMongo}api/responses/responseId/` + donor_code, this.httpOptions2).subscribe(r => resolve(r));
      }, 300)
    });
  }

  async addResponseIdToPacient(): Promise<Observable<any>> {
    var donor_code = this.JwtService.getDonorCode();
    var httpOptions3 = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }) };
    var responseId = await this.getMostRecentResponseID(donor_code);
    return this.http.put<any>(`${baseUrlSql}api/pacient/quizId/` + donor_code, responseId, httpOptions3);
  }

  public addStatus(status, donor_code): Observable<any> {
    var httpOptions3 = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }) };
    return this.http.put<any>(`${baseUrlSql}api/pacient/${status}/${donor_code}`, "", httpOptions3);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}