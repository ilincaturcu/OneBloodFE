import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor() { }


  async authenticate(email, password) {
    var jsonReq = {"email": email, "password":password}
    let loggedIn = true;
    let user;
    //de decomentat daca vrei sa testezi get all...da nu merge
    if(email=="ilinca@gmail.com" && password == "123456"){}

  // await this.loginRequest(jsonReq).subscribe(
  //  (val) => {
  //    console.log("POST call successful value returned in body", val);
  //    sessionStorage.setItem('role', val);
  //    user = sessionStorage.getItem('role')
  //    this.getIdByEmail(email).subscribe(
  //     (val)=>{
  //       sessionStorage.setItem('ID',val);
  //       this.getNameById(val).subscribe(
  //         (val2)=>{
  //           sessionStorage.setItem('name',val2);
  //           console.log("name:")
  //           console.log(val2)
  //         }
  //       )
  //     }
  //   )
  //  },
  //  response => {
  //    console.log("POST call in error", response);
  //    console.log("nope");
  //    console.log("nope2");
  //    window.alert("Wrong credentials");
  //    sessionStorage.setItem('role', 'wrongCredentials');
  //    user = sessionStorage.getItem('role')
  //  });
  
  }
}
// private loginRequest(data: any): Observable<any> {
//   return this.http.post(`${baseUrl}/login`, data, { responseType: 'text' });
// }

  