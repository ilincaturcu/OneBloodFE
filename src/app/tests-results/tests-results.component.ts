import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AppointmentService } from '../services/appointment.service';


@Component({
  selector: 'app-tests-results',
  templateUrl: './tests-results.component.html',
  styleUrls: ['./tests-results.component.scss']
})
export class TestsResultsComponent implements OnInit {

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


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private appointmentService: AppointmentService) {
    this.route.params
      .subscribe(
        params => console.log(params)
      )
    
  }

  async ngOnInit() {
    this.fetchTestsTesults();
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    await this.fetchTestsTesults();
    var self = this;
   setTimeout(function () { self.addRow(); }, 1000);

  }

  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }


  async fetchTestsTesults() {
    await this.appointmentService.getAllTests('IS00050654', '2021-02-14').subscribe((r) => this.getPredonare(r.pre));
  }

 async getPredonare(data: any) {
    await this.rows.map(r => r.Valoare = data[r.Parametru.toLowerCase()])
  }

  initiateForm(data: any): FormGroup {
    return this.fb.group({
      Valoare: [data.Valoare],
      Parametru: [data.Parametru],
      UM: [data.UM]
    });
  }

   addRow() {
    const control =  this.userTable.get('tableRows') as FormArray;
    this.rows.forEach(row => control.push(this.initiateForm(row)));
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
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.touchedRows);

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

