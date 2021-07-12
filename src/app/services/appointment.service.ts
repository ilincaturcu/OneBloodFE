import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/Appointment';
import { JwtClientService } from './jwt-client.service';
import { DonationForm } from '../models/donation-form.model';
import { baseUrlMongo, baseUrlSql } from 'src/environments/environment';
import { MatPaginatorIntl } from '@angular/material/paginator';


@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  token;
  httpOptions;
  donor_code = this.JwtService.getDonorCode();


  constructor(private http: HttpClient, private JwtService: JwtClientService) {
    this.token = JwtService.getToken();
    this.httpOptions = { headers: new HttpHeaders({ 'responseType': 'text', 'Authorization': `Bearer ${this.token}` }) };
  }

  getAppointments(): Observable<any> {
    return this.http.get<Appointment[]>(`${baseUrlSql}api/appointment/donor/` + this.donor_code, this.httpOptions);
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${baseUrlSql}api/doctors`, this.httpOptions);
  }

  getDoctorsAppointments(doctor_code: string): Observable<any> {
    return this.http.get(`${baseUrlSql}api/appointment/doctor/` + doctor_code, this.httpOptions);
  }

  getDoctorsAppointmentsByDate(doctor_code: string, timestamp: number): Observable<any> {
    return this.http.get(`${baseUrlSql}api/appointment/doctor/${doctor_code}/day/${timestamp}`, this.httpOptions);
  }


  getTodayAppointmentsAndPacientsInfo(doctor_code: string): Observable<any> {
    return this.http.get(`${baseUrlSql}api/aggregator/appointments/pacient/doctor/` + doctor_code, this.httpOptions);
  }

  getAllAppointmentsAndPacientsInfoPaginated(doctor_code: string, pageNo: number, pageSize: number): Observable<any> {
    return this.http.get(`${baseUrlSql}api/aggregator/allAppointments/pacient/doctor/${doctor_code}/${pageNo}/${pageSize}`, this.httpOptions);
  }

  getAllAppointmentsAndPacientsInfoPaginatedFiltered(doctor_code: string, pageNo: number, pageSize: number, filter: string): Observable<any> {
    return this.http.get(`${baseUrlSql}api/aggregator/allAppointments/pacient/doctor/${doctor_code}/${pageNo}/${pageSize}/${filter}`, this.httpOptions);
  }

  getFreeHoursForAppointment(doctor_code: string, date: string,): Observable<any> {
    return this.http.get(`${baseUrlSql}api/appointment/doctor/${doctor_code}/day/${date}/hours`, this.httpOptions);
  }

  getAllTests(donationFormId: string): Observable<any> {
    return this.http.get(`${baseUrlSql}api/donationForm/tests/${donationFormId}`, this.httpOptions);
  }

  getAllPreDonationTests(donationFormId: string): Observable<any> {
    return this.http.get(`${baseUrlSql}api/donationForm/tests/pre/${donationFormId}`, this.httpOptions);
  }

  getAllPostDonationTests(donationFormId: string): Observable<any> {
    return this.http.get(`${baseUrlSql}api/donationForm/tests/post/${donationFormId}`, this.httpOptions);
  }


  postAppointment(fk_donor_code: string, fk_doctor_code: string, appointment_date: Date, appointment_hour: string, appointment_status: string = "pending"): Observable<any> {
    return this.http.post(`${baseUrlSql}api/appointments`, { fk_donor_code, fk_doctor_code, appointment_date, appointment_hour, appointment_status }, this.httpOptions);
  }

  cancelAppointment(id: string): Observable<any> {
    return this.http.put<any>(`${baseUrlSql}api/appointment/deleted/` + id, '', this.httpOptions);
  }

  changeAppointmentStatus(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${baseUrlSql}api/appointment/${status}/` + id, '', this.httpOptions);
  }


  sendMailAfterApp(emailContent, emailAddress) {
    return this.http.put<any>(`${baseUrlSql}api/mail/` + emailAddress, emailContent, this.httpOptions);
  }

  getDonationFormByDonorCodeAndDate(donor_code: string, date: string): Observable<any> {
    return this.http.get<DonationForm>(`${baseUrlSql}api/donationForm/${donor_code}/${date}`, this.httpOptions);
  }

  generateDonationFormByDonorCode(donationForm: DonationForm): Observable<any> {
    return this.http.put<DonationForm>(`${baseUrlSql}api/donationForm/${donationForm.fk_donor_code}`, donationForm, this.httpOptions);
  }

  postPreDonare(predonareData): Observable<any> {
    return this.http.post(`${baseUrlMongo}api/predonare`, predonareData, { responseType: 'text' })
  }


  postPostDonare(postdonareData): Observable<any> {
    return this.http.post(`${baseUrlMongo}api/postdonare`, postdonareData, { responseType: 'text' })
  }

  addAnalizeIDsPre(donationFormId: number, id_analize_pre_donare: string): Observable<any> {
    return this.http.put(`${baseUrlSql}api/donationForm/${donationFormId}/pre/${id_analize_pre_donare}`, '', this.httpOptions)
  }

  addAnalizeIDsPost(donationFormId: number,id_analize_post_donare: string): Observable<any> {
    return this.http.put(`${baseUrlSql}api/donationForm/${donationFormId}/post/${id_analize_post_donare}`, '', this.httpOptions)
  }

  getNumberOfAppointmentsOfADoctor(doctor_code: string): Observable<any> {
    return this.http.get(`${baseUrlSql}api/appointment/doctor/${doctor_code}/number`, this.httpOptions);
  }


}

