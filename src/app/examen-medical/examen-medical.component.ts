import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TableUtil } from '../tableUtil';
import { autoTable, RowInput } from 'jspdf-autotable';
import { jsPDF } from 'jspdf';

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
      "Parametru": "Hb",
      "Valoare": "0",
      "UM": "g/dl"
    },
    {
      "Parametru": "Glicemie",
      "Valoare": "0",
      "UM": "mg/dl"
    },
    {
      "Parametru": "Ht",
      "Valoare": "0",
      "UM": "%"
    },
    {
      "Parametru": "Ga",
      "Valoare": "0",
      "UM": "/mmc"
    },
    {
      "Parametru": "Gr",
      "Valoare": "0",
      "UM": "/mmc"
    },
    {
      "Parametru": "Pl",
      "Valoare": "0",
      "UM": "/mmc"
    },
    {
      "Parametru": "Ly",
      "Valoare": "0",
      "UM": "%"
    },
    {
      "Parametru": "Mo",
      "Valoare": "0",
      "UM": "%"
    },
    {
      "Parametru": "Gr",
      "Valoare": "0",
      "UM": "%"
    },
    {
      "Parametru": "TA",
      "Valoare": "0",
      "UM": "mm/hg"
    },
    {
      "Parametru": "P",
      "Valoare": "0",
      "UM": "b/min"
    },
    {
      "Parametru": "G",
      "Valoare": "0",
      "UM": "kg"
    },
    {
      "Parametru": "H",
      "Valoare": "0",
      "UM": "cm"
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

  initiateForm(data: any): FormGroup {
    return this.fb.group({
      Valoare: [[data.Valoare], Validators.required],
      Parametru: [data.Parametru],
      UM: [data.UM],
      isEditable: [true]
    });
  }

  addRow() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.rows.map(x => control.push(this.initiateForm(x)))
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;

    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);

  }

  toggleTheme() {
    this.mode = !this.mode;
  }


  // exportTable(){
  //   // TableUtil.exportToPdf("ExampleTable");

  //   const doc = new jsPDF();
  //   (doc as jsPDF & { autoTable: autoTable }).autoTable({
  //     head: [this.headers],
  //     body: this.userTable.value as RowInput[],
  //     theme: 'plain',
  //     didDrawCell: data => {
  //       console.log(data.column.index)
  //     }
  //   })
  // }
}
