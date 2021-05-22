export interface Appointment {
  appointment_id: number;
  fk_donor_code : string,
  fk_doctor_code : string,
  appointment_date: Date;
  appointment_hour: string;
  appointment_status: string;
  }
  