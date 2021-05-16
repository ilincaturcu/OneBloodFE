export class Doctor {
    public doctor_code: string;
    public name: string;
    public surname: string;
    constructor(doctor_code: string, name: string, surname: string) {
      this.doctor_code = doctor_code;
      this.name = name;
      this.surname = surname;
    }
}
