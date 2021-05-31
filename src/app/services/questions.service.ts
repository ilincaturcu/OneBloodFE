import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Quiz, Question, Answers } from '../models/quiz.model';
import { JwtClientService } from './jwt-client.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

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
        return result.map(r => new Question(r.question, r.choices, r.question_type));
      })
    );
  }

  public getQuestionsBarbati() {
    return this.http.get(`./assets/chestionar-barbati.json`).pipe(
      map((result: any[]) => {
        return result.map(r => new Question(r.question, r.choices, r.question_type));
      })
    );
  }

  public getQuestionsMongo(): Observable<any> {

    var response = this.http.get(`http://localhost:7070/api/questions`, { responseType: 'json' }).pipe(
      map((result: Question[]) => {
        result.map(r => new Question(r.question, r.choices, r.question_type));
      })
    );;

    return response;
  }


  public addResponses(answers: Answers): Observable<any> {

    return this.http.post<Answers>(`http://localhost:7070/api/response`, answers, this.httpOptions2);
  }

  public getMostRecentResponseID1(donor_code) {
    var id;
   this.http.get(`http://localhost:7070/api/responses/responseId/` + donor_code, this.httpOptions2).subscribe(r=> id = r);
   console.log('id= ' + id);
  return id;
  }


  
  public getMostRecentResponseID(donor_code): Promise<any> {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        this.http.get(`http://localhost:7070/api/responses/responseId/` + donor_code, this.httpOptions2).subscribe(r=> resolve(r));
      }, 300)
    });
  }

  async addResponseIdToPacient() : Promise<Observable<any>>{
    var donor_code = this.JwtService.getDonorCode();
    var httpOptions3 = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }) };
    var responseId = await this.getMostRecentResponseID(donor_code);
    console.log("response id" + responseId);
    return this.http.put<any>(`http://localhost:9090/api/pacient/quizId/` + donor_code, responseId, httpOptions3);
  }

  public addStatus(status, donor_code): Observable<any> {
    console.log(status)
    console.log(donor_code)
    console.log(this.token);
    var httpOptions3 = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }) };
    return this.http.put<any>(`http://localhost:9090/api/pacient/${status}/${donor_code}`, "", httpOptions3);
  }

  // public getQuestionsMongoData() {
  //   return new Promise(resolve => {
  //     this.getQuestionsMongo()
  //       .subscribe(data => {
  //         this.data = data;

  //         resolve(this.data);
  //       });
  //   });
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}