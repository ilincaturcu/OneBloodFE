import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtClientService } from './jwt-client.service';
import { Credentials, PacientCredentials } from './pacient.model';

@Injectable({
  providedIn: 'root'
})
export class PacientService {

  token="";
  httpOptions;
  data;

  constructor(private http: HttpClient, private JwtService : JwtClientService) {
    this.token = JwtService.getToken();
   // this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer ${this.token}`})};
   this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  }
  
  // public getQuestionsMongo(): Observable<any>{

  //   var response = this.http.get(`http://localhost:7070/api/questions`, {responseType: 'json'}).pipe(
  //     map((result: Question[]) => {
  //       result.map(r => new Question(r.question, r.choices, r.question_type));
  //     })
  //   );;
    
  //   return response;
  // }


  public addPacientWithCredentials(pacient : PacientCredentials): Observable<any> {
    console.log("in post")
    console.log(pacient)
    return this.http.post<PacientCredentials>(`http://localhost:9090/agreggator/cont/pacient`, pacient, this.httpOptions);
  }

  
  // public addCredentials(credentials : any): Observable<any> {
  //   console.log("in post")
  //   console.log(credentials)
  //   return this.http.post<Credentials>(`http://localhost:9090/api/credentials`, credentials, this.httpOptions);
  // }
  
  
  }
