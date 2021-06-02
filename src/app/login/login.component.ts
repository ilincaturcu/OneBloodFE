import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtClientService } from '../services/jwt-client.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authRequest: any =
    {
      "userName": "ilincafturcu@gmail.com",
      "password": "Ilinca-113473"
    }
donorReq:any =
    {
      "email": "ilincafturcu@gmail.com",
      "password": "Ilinca-113473"
    }
  response: any;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  invalidLogin = false;
  isLoggedIn = false;
  errorMessage = '';
  constructor(private service: JwtClientService, private fb: FormBuilder,  private router: Router) { }


  ngOnInit() {
    //this.getAccessToken(this.authRequest);
    //this.accessApi(this.service.getToken());
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  public getAccessToken(req) {
    let response = this.service.generateToken(req);
    response.subscribe(tokenJWT => this.service.saveToken(tokenJWT),
      error => {
        console.log(error);
        window.alert("Credentialele sunt gresite. Incercati din nou");
        sessionStorage.setItem('Role', 'wrongCredentials');
        this.errorMessage = error.error.message;
        this.invalidLogin = true;
        this.router.navigate(['/login']);
        return;
      });
  }


  public getDonorCode(req) {
    let response = this.service.getDonorCodeReq(req);
    response.subscribe(donorCode => this.service.saveDonorCode(donorCode),
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.invalidLogin = true;
      });
  }

  public getRoleValue(req) {
    let response = this.service.getRoleReq(req);
    response.subscribe(role => this.service.saveRole(role),
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.invalidLogin = true;
      });
  }

  public accessApi(token) {
    let res = this.service.welcome(token);
    res.subscribe(data => this.response = data)
  }

  async onSubmit() {
    this.submitted = true;
    this.authRequest.userName = this.loginForm.controls['email'].value;
    this.authRequest.password = this.loginForm.controls['password'].value;
    console.log(this.authRequest)
    await this.getAccessToken(this.authRequest);
    this.getRoleValue(this.authRequest);
    if (this.loginForm.invalid) {
      return;
    }
    

    setTimeout(() => {
      if (sessionStorage.getItem("Role").valueOf() == 'wrongCredentials') {
        this.router.navigate(['/login']);
        this.invalidLogin = true;
      }
      else if (sessionStorage.getItem("Role").valueOf() == 'Pacient') {
        console.log("pacient")
        this.donorReq.email = this.loginForm.controls['email'].value;
        this.donorReq.password = this.loginForm.controls['password'].value;
        this.getDonorCode(this.donorReq);
        this.router.navigate(['/']);
        this.invalidLogin = false;
      }
      else if(sessionStorage.getItem("Role").valueOf() == 'Doctor') {
        console.log("doctor")
        this.router.navigate(['/']);
        this.invalidLogin = false;
      }
    },
      1000);
  }

  public loginHasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }


  onRegister(){
    this.router.navigate(['/register']);
  }
}
