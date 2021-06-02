export interface Deserializable {
  deserialize(input: any): this;
}

export class Pacient implements Deserializable {
  constructor(cnp: bigint,
    fk_donor_code: string,
    self_exclusion_form_id: number,
    donor_code: string, 
    status: string,
    created_at: Date) { }

    deserialize(input: any): this {
      Object.assign(this, input);
      return this;
    }
}


export class Credentials {
  constructor(email: string,
    password: string) { }
}

export class personalInformation {
  constructor(name: string,
    surname: string,
    mothers_name: string,
    fathers_name: string,
    birthdate: Date,
    identity_card_series: string,
    identity_card_number: number,
    phone_number: bigint,
    sex: string,
    job: string) { }
}

export class PacientCredentials {
  public pacient: Pacient;
  public credentials: Credentials;
  public personalInformation: personalInformation;
  constructor(pacient: Pacient, credentials: Credentials, personalInformation: personalInformation) {
    this.pacient = pacient;
    this.credentials = credentials;
    this.personalInformation = personalInformation;
  }
}