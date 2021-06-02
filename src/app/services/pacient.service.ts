import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtClientService } from './jwt-client.service';
import { Credentials, PacientCredentials } from '../models/pacient.model';

@Injectable({
  providedIn: 'root'
})
export class PacientService {

  token = "";
  httpOptions;
  httpOptionsWithtoken;
  data;

  constructor(private http: HttpClient, private JwtService: JwtClientService) {
    this.token = JwtService.getToken();

    this.httpOptionsWithtoken = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
        'Authorization': `Bearer ${this.token}`
      }),
      'responseType': 'text'
    };

    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  // public getQuestionsMongo(): Observable<any>{

  //   var response = this.http.get(`http://localhost:7070/api/questions`, {responseType: 'json'}).pipe(
  //     map((result: Question[]) => {
  //       result.map(r => new Question(r.question, r.choices, r.question_type));
  //     })
  //   );;

  //   return response;
  // }


  public addPacientWithCredentials(pacient: PacientCredentials): Observable<any> {
    console.log(pacient)
    return this.http.post<PacientCredentials>(`http://localhost:9090/agreggator/cont/pacient`, pacient, this.httpOptions);
  }


  public getPacientStatus(donor_code: string): Observable<any> {

    return this.http.get<string>(`http://localhost:9090/api/pacient/status/` + donor_code, this.httpOptionsWithtoken);
  }


  public doesTheDonorHaveAnApp(donor_code: string): Observable<any> {

    return this.http.get<string>(`http://localhost:9090/api/appointment/current/` + donor_code, this.httpOptionsWithtoken);
  }

  public getLastDonorID(): Observable<any> {
    return this.http.get<string>(`http://localhost:9090/api/pacient/last/donor_code`, this.httpOptionsWithtoken)
  }

  public getAccountIdAdressByDonorCode(donor_code: string): Observable<any> {
   return this.http.get<string>(`http://localhost:9090/api/pacient/accountId/donor_code/` + donor_code, this.httpOptionsWithtoken);
  }


  public getEmailAdressByAccountId(accountID: string): Observable<any> {
    console.log("accountID " + accountID);
    return this.http.get<string>(`http://localhost:9090/api/cont/email/accountId/` + accountID, this.httpOptionsWithtoken);
   }

   sendMailAfterApp(emailContent, emailAddress){
    return this.http.put<any>(`http://localhost:9090/api/mail/` + emailAddress, emailContent, this.httpOptions);
  }

   doesTheEmailHasAnAccount(email: string): Observable<any> {
    console.log("register email " + email);
    return this.http.get<string>(`http://localhost:9090/api/mail/existingAccount/` + email, this.httpOptions);
   }
}
