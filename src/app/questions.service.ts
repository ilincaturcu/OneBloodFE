import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Quiz, Question } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) {}

  public getQuestions() {
    return this.http.get(`./assets/chestionar.json`).pipe(
      map((result: any[]) => {
        return result.map(r => new Question(r.question, r.choices));
      })
    );
  }
}