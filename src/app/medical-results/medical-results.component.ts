import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/Appointment';
import { AppointmentService } from '../services/appointment.service';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DonationForm } from '../models/donation-form.model';

@Component({
  selector: 'app-medical-results',
  templateUrl: './medical-results.component.html',
  styleUrls: ['./medical-results.component.scss']
})
export class MedicalResultsComponent implements OnInit {

  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public appointments: Appointment[];
  public columns = ['appointmentDate', 'hour', 'status', 'cancel'];
  public button = { "progress": "", "pending": "Anulare", "completed": "Rezultate analize" };
  public appointment_status = ["progress", "pending", "completed"]

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  async ngOnInit() {
    await this.appointmentService.getAppointments()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments.filter(a => this.isDeleted(a.appointment_status));
        this.loading = false;
      },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
          this.loading = false;
        });
  }

  cancelAppointment(id: string) {
    this.appointmentService.cancelAppointment(id)
      .pipe(
        mergeMap(() => this.appointmentService.getAppointments())
      )
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments.filter(a => this.isDeleted(a.appointment_status));
        this.successMsg = 'Ați anulat programarea cu succes';
      },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        });
  }


  isDeleted(status: string): boolean {
    return (status != 'deleted');
  }


  async viewResults(donor_code: string, appointmentDate: string) {
    var tzoffset = (new Date(appointmentDate)).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().split('T')[0];
    var id = await this.getDonationFormIdPromise(donor_code, localISOTime);
    this.router.navigate(['tests-results/' + id]);

  }


  public getDonationFormIdPromise(donor_code, appointmentDate): Promise<DonationForm> {
    return new Promise<DonationForm>((resolve) => {
      setTimeout(() => {
        this.appointmentService.getDonationFormByDonorCodeAndDate(donor_code, appointmentDate).subscribe(r => resolve(r.donation_form_id));
      }, 300)
    });
  }


  async actionButton(status: string, id: string, donor_code: string, appointmentDate: string) {
    switch (status) {
      case "progress": {
        break;
      }
      case "pending": {
        this.cancelAppointment(id);
        break;
      }
      case "completed": {
        //view test results; 
        await this.viewResults(donor_code, appointmentDate);
        break;
      }
    }
  }
}
