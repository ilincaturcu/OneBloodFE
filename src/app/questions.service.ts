import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Quiz, Question, Answers } from './quiz.model';
import { JwtClientService } from './jwt-client.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'responseType': 'text'
  })
};




@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient, private JwtService : JwtClientService) {}

  httpOptions2 = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };

  data;
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

  public getQuestionsMongo(): Observable<any>{

    var response = this.http.get(`http://localhost:7070/api/questions`, {responseType: 'json'}).pipe(
      map((result: Question[]) => {
        result.map(r => new Question(r.question, r.choices, r.question_type));
      })
    );;
    
    return response;
  }


  public addResponses(answers : Answers): Observable<any> {
    return this.http.post<Answers>(`http://localhost:7070/api/response`, answers, this.httpOptions2);
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