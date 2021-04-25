import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TableUtil } from '../tableUtil';

@Component({
  selector: 'app-examen-medical',
  templateUrl: './examen-medical.component.html',
  styleUrls: ['./examen-medical.component.scss']
})
export class ExamenMedicalComponent implements OnInit {

  userTable: FormGroup;
  control: FormArray;
  values: FormArray;
  mode: boolean;
  touchedRows: any;

  headers = ["Parametru", "Valoare", "UM"];
  rows = [
    {
      "Parametru" : "Hb",
      "Valoare" : "",
      "UM" : "g/dl"
    },
    {
      "Parametru" : "Glicemie",
      "Valoare" : "",
      "UM" : "mg/dl"
    },
    {
      "Parametru" : "Ht",
      "Valoare" : "",
      "UM" : "%"
    },
    {
      "Parametru" : "Ga",
      "Valoare" : "",
      "UM" : "/mmc"
    },
    {
      "Parametru" : "Gr",
      "Valoare" : "",
      "UM" : "/mmc"
    },
    {
      "Parametru" : "Pl",
      "Valoare" : "",
      "UM" : "/mmc"
    },
    {
      "Parametru" : "Ly",
      "Valoare" : "",
      "UM" : "%"
    },
    {
      "Parametru" : "Mo",
      "Valoare" : "",
      "UM" : "%"
    },
    {
      "Parametru" : "Gr",
      "Valoare" : "",
      "UM" : "%"
    },
    {
      "Parametru" : "TA",
      "Valoare" : "",
      "UM" : "mm/hg"
    },
    {
      "Parametru" : "P",
      "Valoare" : "",
      "UM" : "b/min"
    },
    {
      "Parametru" : "G",
      "Valoare" : "",
      "UM" : "kg"
    },
    {
      "Parametru" : "H",
      "Valoare" : "",
      "UM" : "cm"
    }
  ]
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();
  }

  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      Valoare: ['', [ Validators.required]],
      isEditable: [true]
    });
  }

  addRow() {
    const control =  this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }



  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;
    console.log(control)
    this.touchedRows = control.controls.map(row => row.value);
    console.log(this.touchedRows);
  }

  toggleTheme() {
    this.mode = !this.mode;
  }


  exportTable(){
    TableUtil.exportToPdf("ExampleTable");
  }
}
