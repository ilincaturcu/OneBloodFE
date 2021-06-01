import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { windowWhen } from 'rxjs/operators';
import { baseUrlSql } from 'src/environments/environment';

const TOKEN_KEY = 'AuthToken';
const ROLE_KEY = 'Role';
const DONOR_CODE = 'DonorCode';

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
   if(window.sessionStorage.getItem(TOKEN_KEY) !=null)
      window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public saveRole(role) {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, role);
  }
 
  public saveDonorCode(donorCode){
    window.sessionStorage.removeItem(DONOR_CODE);
    window.sessionStorage.setItem(DONOR_CODE, donorCode);
  }

  public getToken(){
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getRole(){
    return sessionStorage.getItem(ROLE_KEY);
  }

  public getDonorCode(){
    return sessionStorage.getItem(DONOR_CODE);
  }

  signOut() {
    window.sessionStorage.clear();
  }

  public generateToken(request){
    return this.http.post(`${baseUrlSql}authenticate`, request, {responseType: 'text' as 'json'});
  }

  public getRoleReq(request){
   
    return this.http.post(`${baseUrlSql}authorization`, request, {responseType: 'text' as 'json'});
  }

  public getDonorCodeReq(request){
    let token = 'Bearer ' + sessionStorage.getItem(TOKEN_KEY);
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post(`${baseUrlSql}api/aggregator/pacient/donor_code`, request,  {headers, responseType: 'text' as 'json'})
  }


  async getDonorGender(){
    let token = 'Bearer ' + sessionStorage.getItem(TOKEN_KEY);
    const headers = new HttpHeaders().set("Authorization", token);
   
    this.cnp = await this.getCNP( headers);
    let url = `${baseUrlSql}api/personalInformation/gender/` + this.cnp;
    return this.http.get(url,  {headers, responseType: 'text' as 'json'})
  }


 async getCNP(headers): Promise<string> {
    let url = `${baseUrlSql}api/pacient/cnp/` + this.donor_code;
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        this.http.get(url,  {headers, responseType: 'text'}).subscribe(status =>resolve(status))
      }, 100)
    });
  }

  public canDonorCompleteTheQuiz(){
    const donorCode = this.donor_code;
    return this.http.get(`http://localhost:7070/api/responses/dates/` + donorCode, {responseType: 'text' as 'json'})
  }

  public welcome(token){
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set("Authorization", tokenStr)
    return this.http.get(`http://localhost:9090/`, {headers, responseType: 'text' as 'json'});
  }

  public isAuthenticated(): boolean {
    // const role = sessionStorage.getItem('role');
    // console.log("role:")
    // console.log(role)
    // return role == "admin" || role == "voluntar";
    return true;
  }
}
