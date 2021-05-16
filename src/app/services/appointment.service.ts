import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/Appointment';
import { JwtClientService } from './jwt-client.service';
import { map } from 'rxjs/operators';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  //private BASE_URL = environment.API_URL;
token;
httpOptions;
  constructor(private http: HttpClient, private JwtService : JwtClientService) {
  this.token = JwtService.getToken();
   this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer ${this.token}`})};
  }
  
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(``);
  }

  getDoctors(): Observable<any> {
    return this.http.get(`http://localhost:9090/api/doctors`,this.httpOptions);
  }

  getDoctorsAppointments(doctor_code : string): Observable<any> {
    return this.http.get(`http://localhost:9090/api/appointment/doctor/` + doctor_code, this.httpOptions);
  }


  createAppointment(appointmentDate: string, status: string, hour: string): Observable<Appointment> {
    console.log(appointmentDate)
    return this.http.post<Appointment>(``, { appointmentDate, status, hour });
  }

  cancelAppointment(id: string): Observable<any> {
    return this.http.delete(``);
  }
}
