import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/Appointment';
import { JwtClientService } from './jwt-client.service';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  //private BASE_URL = environment.API_URL;
token;
httpOptions;
donor_code = 'IS00050653';
  constructor(private http: HttpClient, private JwtService : JwtClientService) {
  this.token = JwtService.getToken();
   this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer ${this.token}`})};
  }
  
  getAppointments(): Observable<any> {
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

  getFreeHoursForAppointment(doctor_code : string, date : Date, ): Observable<any> {
    return this.http.get(`http://localhost:9090/api/appointment/doctor/${doctor_code}/day/${date}/hours`, this.httpOptions);
  }

  postAppointment(fk_donor_code : string, fk_doctor_code : string, appointment_date : Date, appointment_hour : string, appointment_status: string = "pending"): Observable<any>{
    return this.http.post(`http://localhost:9090/api/appointments`, {fk_donor_code, fk_doctor_code, appointment_date, appointment_hour, appointment_status }, this.httpOptions);
  }

  createAppointment(appointmentDate: string, status: string, hour: string): Observable<Appointment> {
    console.log(appointmentDate)
    return this.http.post<Appointment>(``, { appointmentDate, status, hour });
  }

  cancelAppointment(id: string): Observable<any> {
    return this.http.delete(`http://localhost:9090/api/appointment/` + id, this.httpOptions);
  }
}