// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   loginForm: FormGroup;
//   loading = false;
//   submitted = false;
//   invalidLogin = false;

//   constructor(
//     private router: Router,
//     private formBuilder: FormBuilder,
//     //private loginservice: ApiService
//   ) { }

//   ngOnInit(): void {
//     this.loginForm = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@+[A-Za-z0-9._%+-]+.tuiasi.ro$')]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   async onSubmit() {
//     this.submitted = true;
//     if (this.loginForm.invalid) {
//       return;
//     }
//     //  console.log(this.loginservice.authenticate(this.f.email.value, this.f.password.value));
//   // await this.loginservice.authenticate(this.f.email.value, this.f.password.value);

//     setTimeout(() => {
//       if (sessionStorage.getItem("role").valueOf() == 'wrongCredentials') {
//         this.router.navigate(['/voluntari']);
//         this.invalidLogin = true;
//       }
//       else {
//         console.log("da")
//         this.router.navigate(['/voluntari/home']);
//         this.invalidLogin = false;
//       }
//     },
//       1000);
 

//   }

//   get f() { return this.loginForm.controls; }
// }
