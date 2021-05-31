import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { windowWhen } from 'rxjs/operators';
import { baseUrlSql } from 'src/environments/environment';

const TOKEN_KEY = 'AuthToken';
const ROLE_KEY = 'Role';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private http: HttpClient) { }

  public saveToken(token) {
   if(window.sessionStorage.getItem(TOKEN_KEY) !=null)
      window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public saveRole(role) {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, role);
  }
 
  public getToken(){
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getRole(){
    return sessionStorage.getItem(ROLE_KEY);
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
