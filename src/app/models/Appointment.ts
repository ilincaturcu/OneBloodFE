import { MatPaginator } from "@angular/material/paginator";
import { Pacient, personalInformation } from "./pacient.model";

export class Appointment {
  public appointment_id: number;
  public fk_donor_code: string;
  public fk_doctor_code: string;
  public appointment_date: Date;
  public appointment_hour: string;
  public appointment_status: string;

  constructor(appointment_date: Date,
    appointment_hour: string,
    appointment_id: number,
    appointment_status: string,
    fk_doctor_code: string,
    fk_donor_code: string
  ) {
    this.fk_donor_code = fk_donor_code;
    this.fk_doctor_code = fk_doctor_code;
    this.appointment_status = appointment_status;
    this.appointment_id = appointment_id;
    this.appointment_hour = appointment_hour;
    this.appointment_date = appointment_date;
  }
}


export class PacientAppointment {
  public pacient: Pacient;
  public appointment: Appointment;
  public personalInformation: personalInformation;
  constructor(pacient: Pacient, appointment: Appointment, personalInformation: personalInformation) {
    this.pacient = pacient;
    this.appointment = appointment;
    this.personalInformation = personalInformation;
  }
}