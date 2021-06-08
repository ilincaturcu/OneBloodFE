import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { datePickerValidator } from '../datepicker-validator';
import { PacientService } from '../services/pacient.service';
import { Credentials, Pacient, PacientCredentials, personalInformation } from '../models/pacient.model';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fisaDonareControl: FormGroup;
  loginForm: FormGroup;
  pacientControl: FormGroup;
  sexes: string[];
  dateOfBirth: Date;
  minDate: Date;
  maxDate: Date;
  credentials: Credentials;
  pacient: Pacient;
  personalInfo: personalInformation;
  pacientCredentials: PacientCredentials;
  //pacientID = 'IS' + nanoid(8);
  newID = 'IS' + nanoid(8);
  statusDefault = 'pending';
  invalid = false;


  myDateFilter = (m: Date | null): boolean => {
    const day = m.getDay();
    return day !== 0 && day !== 6;
  }
   constructor(private fb: FormBuilder, private pacientService: PacientService, private router: Router) {
  
   }

  ngOnInit(): void {


    this.fisaDonareControl = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      surname: ['', [Validators.required, Validators.maxLength(15)]],
      identity_card_series: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      identity_card_number: ['', [Validators.required, Validators.min(0), Validators.minLength(6), Validators.maxLength(6)]],
      birthdate: ['', [Validators.required, datePickerValidator()]],
      age: ['', [Validators.required, Validators.min(18), Validators.maxLength(3)]],
      adress: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.min(0), Validators.minLength(10), Validators.maxLength(15)]],
      job: ['', Validators.required],
      sex: ['', Validators.required],
      mothers_name: [''],
      fathers_name: ['']
    });

    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });

    this.pacientControl = this.fb.group({
      cnp: ['', [Validators.required, Validators.min(0), Validators.minLength(13), Validators.maxLength(13)]],
      self_exclusion_form_id: [0],
      donor_code: [this.newID],
      status: [this.statusDefault],
      created_at: [new Date().toISOString().split('T')[0]]
    })

    this.sexes = [
      'Feminin',
      'Masculin'
    ];


    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);

  }
  public hasError = (controlName: string, errorName: string) => {
    this.invalid = true;
    return this.fisaDonareControl.controls[controlName].hasError(errorName);
  }

  public loginHasError = async (controlName: string, errorName: string) => {
    this.invalid = true;
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public pacientHasError = (controlName: string, errorName: string) => {
    this.invalid = true;
    return this.pacientControl.controls[controlName].hasError(errorName);
  }

  async saveUserDetails() {
   // if (this.invalid != true) {


   //validate email does not exist in the system
   var account = await this.emailAlredyExists(this.loginForm.controls['email'].value);
   if(account.toString() == 'false'){
      this.credentials = this.loginForm.value;
      this.pacient = this.pacientControl.value;
      this.personalInfo = this.fisaDonareControl.value;
      this.pacientCredentials = new PacientCredentials(this.pacient, this.credentials, this.personalInfo);
      this.pacientService.addPacientWithCredentials(this.pacientCredentials).subscribe();
      window.alert('Cont creat cu succes.Veti primi un email cu toate informatiile')
      var emailContent = "Ati creat cu succes un nou cont pe platforma OneBlood. Urmatorul pas este sa completati chestionarul de autoexcludere si apoi sa realizati o programare.";
      console.log(this.loginForm.controls['email'])
      this.pacientService.sendMailAfterApp(emailContent, this.loginForm.controls['email'].value).subscribe();
      this.router.navigate(['/login'])
   }
   else
   window.alert('Exista un cont asociat email-ului ales')
   //}
    //else return;
  }

// emailAlredyExists(){
//  // this.pacientService.doesTheEmailHasAnAccount(this.loginForm.controls['email'].value).subscribe()
//  return this.pacientService.doesTheEmailHasAnAccount("ilinca.turcu@bestis.ro").subscribe();
// }




public emailAlredyExists(email): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      this.pacientService.doesTheEmailHasAnAccount(email).subscribe(flag =>resolve(flag))
    }, 300)
  });
}

  autoIncrementPacientId(): string {
    var lastPacientId;
    var kmsStr;
    this.pacientService.getLastDonorID().subscribe((id) => {


      lastPacientId = id;
      console.log(lastPacientId)
      let increasedNum = Number(lastPacientId.replace('IS', '')) + 1;
      kmsStr = lastPacientId.substr(0, 2);
      for (let i = 0; i < 8 - increasedNum.toString().length; i++) {
        kmsStr = kmsStr + '0';
      }
      kmsStr = kmsStr + increasedNum.toString();


    });
    return kmsStr;
  }


}
