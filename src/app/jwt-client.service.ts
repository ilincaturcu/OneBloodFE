import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private http: HttpClient) { }

  public saveToken(token) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
 
  public getToken(){
    return sessionStorage.getItem(TOKEN_KEY);
  }

  signOut() {
    window.sessionStorage.clear();
  }

  public generateToken(request){
    return this.http.post("http://localhost:9090/authenticate", request, {responseType: 'text' as 'json'});
  }

  public welcome(token){
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set("Authorization", tokenStr)
    return this.http.get("http://localhost:9090/", {headers, responseType: 'text' as 'json'});
  }
}
