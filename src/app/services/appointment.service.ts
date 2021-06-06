import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, PacientAppointment } from '../models/Appointment';
import { JwtClientService } from './jwt-client.service';
import { DonationForm } from '../models/donation-form.model';


@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  //private BASE_URL = environment.API_URL;
token;
httpOptions;
donor_code =  this.JwtService.getDonorCode();


  constructor(private http: HttpClient, private JwtService : JwtClientService) {
  this.token = JwtService.getToken();
   this.httpOptions = { headers: new HttpHeaders({ 'responseType': 'text','Authorization': `Bearer ${this.token}`})};
  }
  
  getAppointments(): Observable<any> {
    console.log("donor_code " + this.donor_code);
    return this.http.get<Appointment[]>(`http://localhost:9090/api/appointment/donor/` + this.donor_code, this.httpOptions);
  }

  getDoctors(): Observable<any> {
    return this.http.get(`http://localhost:9090/api/doctors`,this.httpOptions);
  }

  getDoctorsAppointments(doctor_code : string): Observable<any> {
    return this.http.get(`http://localhost:9090/api/appointment/doctor/` + doctor_code, this.httpOptions);
  }

  getDoctorsAppointmentsByDate(doctor_code : string, timestamp : number): Observable<any> {
    return this.http.get(`http://localhost:9090/api/appointment/doctor/${doctor_code}/day/${timestamp}`, this.httpOptions);
  }


  getTodayAppointmentsAndPacientsInfo(doctor_code : string): Observable<any> {
    return this.http.get(`http://localhost:9090/api/aggregator/appointments/pacient/doctor/` + doctor_code, this.httpOptions);
  }

  getAllAppointmentsAndPacientsInfo(doctor_code : string): Observable<any> {
    return this.http.get(`http://localhost:9090/api/aggregator/allAppointments/pacient/doctor/` + doctor_code, this.httpOptions);
  }


  getFreeHoursForAppointment(doctor_code : string, date : Date, ): Observable<any> {
    return this.http.get(`http://localhost:9090/api/appointment/doctor/${doctor_code}/day/${date}/hours`, this.httpOptions);
  }

  getAllTests(donationFormId : string ): Observable<any> {
    return this.http.get(`http://localhost:9090/api/donationForm/tests/${donationFormId}`, this.httpOptions);
  }

  getAllPreDonationTests(donationFormId : string ): Observable<any> {
    return this.http.get(`http://localhost:9090/api/donationForm/tests/pre/${donationFormId}`, this.httpOptions);
  }

  getAllPostDonationTests(donationFormId : string ): Observable<any> {
    return this.http.get(`http://localhost:9090/api/donationForm/tests/post/${donationFormId}`, this.httpOptions);
  }


  postAppointment(fk_donor_code : string, fk_doctor_code : string, appointment_date : Date, appointment_hour : string, appointment_status: string = "pending"): Observable<any>{
    return this.http.post(`http://localhost:9090/api/appointments`, {fk_donor_code, fk_doctor_code, appointment_date, appointment_hour, appointment_status }, this.httpOptions);
  }


  // cancelAppointment(id: string): Observable<any> {
  //   //this.http.options(`http://localhost:9090/api/appointment/` + id, this.httpOptions);
  //   return this.http.delete(`http://localhost:9090/api/appointment/` + id, this.httpOptions);
  // }

  
   cancelAppointment(id: string): Observable<any> {
     return this.http.put<any>(`http://localhost:9090/api/appointment/deleted/` + id,'', this.httpOptions);
   }


   sendMailAfterApp(emailContent, emailAddress){
     return this.http.put<any>(`http://localhost:9090/api/mail/` + emailAddress,emailContent, this.httpOptions);
   }

   getDonationFormByDonorCodeAndDate(donor_code: string, date:string) : Observable<any>{
     return this.http.get<DonationForm>(`http://localhost:9090/api/donationForm/${donor_code}/${date}`, this.httpOptions);
   }

   generateDonationFormByDonorCode(donationForm: DonationForm) : Observable<any>{
    return this.http.put<DonationForm>(`http://localhost:9090/api/donationForm/${donationForm.fk_donor_code}`,donationForm, this.httpOptions);
   }

   postPreDonare(predonareData):Observable<any>{
     console.log("PREDONARE");
    return this.http.post(`http://localhost:7070/api/predonare`,predonareData, {responseType: 'text'})
  }

  
  postPostDonare(postdonareData):Observable<any>{
    console.log("POSTDONARE")
    return this.http.post(`http://localhost:7070/api/postdonare`,postdonareData, {responseType: 'text'})
  }

  addAnalizeIDs(donationFormId : number, id_analize_pre_donare: string, id_analize_post_donare:string):Observable<any>{
    return this.http.put(`http://localhost:9090/api/donationForm/${donationFormId}/${id_analize_pre_donare}/${id_analize_post_donare}`,'', this.httpOptions)
  }
}
