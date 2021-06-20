import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrlMongo, baseUrlSql } from 'src/environments/environment';

const TOKEN_KEY = 'AuthToken';
const ROLE_KEY = 'Role';
const DONOR_CODE = 'DonorCode';
const DOCTOR_CODE = 'DoctorCode';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {
  donor_code;
  cnp;
  constructor(private http: HttpClient) {
    this.donor_code = this.getDonorCode();
  }

  public saveToken(token) {
    if (window.sessionStorage.getItem(TOKEN_KEY) != null)
      window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public saveRole(role) {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, role);
  }

  public saveDonorCode(donorCode) {
    window.sessionStorage.removeItem(DONOR_CODE);
    window.sessionStorage.setItem(DONOR_CODE, donorCode);
  }


  public saveDoctorCode(doctor_Code) {
    window.sessionStorage.removeItem(DOCTOR_CODE);
    window.sessionStorage.setItem(DOCTOR_CODE, doctor_Code);
  }

  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getRole() {
    return sessionStorage.getItem(ROLE_KEY);
  }

  public getDonorCode() {
    return sessionStorage.getItem(DONOR_CODE);
  }

  public getDoctorCode() {
    return sessionStorage.getItem(DOCTOR_CODE);
  }

  signOut() {
    window.sessionStorage.clear();
  }

  public generateToken(request) {
    return this.http.post(`${baseUrlSql}authenticate`, request, { responseType: 'text' as 'json' });
  }

  public getRoleReq(request) {

    return this.http.post(`${baseUrlSql}authorization`, request, { responseType: 'text' as 'json' });
  }

  public getDonorCodeReq(request) {
    let token = 'Bearer ' + sessionStorage.getItem(TOKEN_KEY);
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post(`${baseUrlSql}api/aggregator/pacient/donor_code`, request, { headers, responseType: 'text' as 'json' })
  }

  public getDoctorCodeReq(request) {
    let token = 'Bearer ' + sessionStorage.getItem(TOKEN_KEY);
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post(`${baseUrlSql}api/aggregator/doctor/doctor_code`, request, { headers, responseType: 'text' as 'json' })
  }



  async getDonorGender() {
    let token = 'Bearer ' + sessionStorage.getItem(TOKEN_KEY);
    const headers = new HttpHeaders().set("Authorization", token);

    this.cnp = await this.getCNP(headers);
    let url = `${baseUrlSql}api/personalInformation/gender/` + this.cnp;
    return this.http.get(url, { headers, responseType: 'text' as 'json' })
  }


  async getCNP(headers): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        let url = `${baseUrlSql}api/pacient/cnp/` + this.donor_code;
        this.http.get(url, { headers, responseType: 'text' }).subscribe(status => resolve(status))
      }, 500)
    });
  }

  public canDonorCompleteTheQuiz() {
    const donorCode = this.getDonorCode();
    return this.http.get(`${baseUrlMongo}api/responses/dates/` + donorCode, { responseType: 'text' as 'json' })
  }

  public isAuthenticated(): boolean {
    return this.getToken !== null;
  }
}
