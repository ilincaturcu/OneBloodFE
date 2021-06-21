import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtClientService } from './jwt-client.service';
import { PacientCredentials } from '../models/pacient.model';
import { baseUrlSql } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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

  public addPacientWithCredentials(pacient: PacientCredentials): Observable<any> {
    console.log(pacient)
    return this.http.post<PacientCredentials>(`${baseUrlSql}agreggator/cont/pacient`, pacient, this.httpOptions);
  }


  public getPacientStatus(donor_code: string): Observable<any> {

    return this.http.get<string>(`${baseUrlSql}api/pacient/status/` + donor_code, this.httpOptionsWithtoken);
  }


  public doesTheDonorHaveAnApp(donor_code: string): Observable<any> {

    return this.http.get<string>(`${baseUrlSql}api/appointment/current/` + donor_code, this.httpOptionsWithtoken);
  }

  public getLastDonorID(): Observable<any> {
    return this.http.get<string>(`${baseUrlSql}api/pacient/last/donor_code`, this.httpOptionsWithtoken)
  }

  public getAccountIdAdressByDonorCode(donor_code: string): Observable<any> {
    return this.http.get<string>(`${baseUrlSql}api/pacient/accountId/donor_code/` + donor_code, this.httpOptionsWithtoken);
  }


  public getEmailAdressByAccountId(accountID: string): Observable<any> {
    return this.http.get<string>(`${baseUrlSql}api/cont/email/accountId/` + accountID, this.httpOptionsWithtoken);
  }

  sendMailAfterApp(emailContent, emailAddress) {
    return this.http.put<any>(`${baseUrlSql}api/mail/` + emailAddress, emailContent, this.httpOptions);
  }

  doesTheEmailHasAnAccount(email: string): Observable<any> {
    return this.http.get<string>(`${baseUrlSql}api/mail/existingAccount/` + email, this.httpOptions);
  }

  getPacientByDonorCode1(donor_code: string): any {
    return this.http.get<string>(`${baseUrlSql}api/pacient/` + donor_code, this.httpOptionsWithtoken);
  }

  getPacientPErsonalInfoByCnp(cnp: bigint): any {
    return this.http.get<string>(`${baseUrlSql}api/personalInformation/` + cnp, this.httpOptionsWithtoken);
  }


  getPacientByDonorCode(donor_code: string): Observable<any> {
    return this.http.get(`${baseUrlSql}api/pacient/` + donor_code, this.httpOptionsWithtoken);
  }

  public changePacientStatus(status, donor_code): Observable<any> {
    var httpOptions3 = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }) };
    return this.http.put<any>(`${baseUrlSql}api/pacient/${status}/${donor_code}`, "", httpOptions3);
  }


  public getExtraInfoForTestsResults() {
    return this.http.get(`./assets/analize.json`).pipe(
      map((result: any[]) => {
        return result;
      })
    );
  }
}
