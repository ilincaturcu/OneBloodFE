import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './Appointment';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  //private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(``);
  }

  createAppointment(appointmentDate: string, status: string, hour: string): Observable<Appointment> {
    console.log(appointmentDate)
    return this.http.post<Appointment>(``, { appointmentDate, status, hour });
  }

  cancelAppointment(id: string): Observable<any> {
    return this.http.delete(``);
  }
}
