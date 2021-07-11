import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AppointmentService } from '../services/appointment.service';
import { JwtClientService } from '../services/jwt-client.service';
import { PacientService } from '../services/pacient.service';


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
  rows;
  rowsDefaultPre = [
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

  rowsDefaultPost = [
    
    {
      "Parametru": "HIV",
      "Valoare": "",
      
    },
    {
      "Parametru": "Syphilis",
      "Valoare": "",
      
    }
  ]

  rowsDefaultAll = [
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
    },
    {
      "Parametru": "HIV",
      "Valoare": "",
      
    },
    {
      "Parametru": "Syphilis",
      "Valoare": "",
      
    }
  ]
  donationFormId;
  editable = true;
  donor_code;
  role;
  type;
  appointment_id;
  list = ["HIV", "Syphilis"];
  extraInfo=[];
  id_analize_pre_donare;



  constructor(private fb: FormBuilder, private route: ActivatedRoute, private appointmentService: AppointmentService, private auth: JwtClientService, private router: Router,private pacient :PacientService) {
    this.route.params
      .subscribe(
        (params) => {
          this.donationFormId = params.id;
          this.donor_code = params.donorCode;
          this.type = params.type;
          this.appointment_id = params.appId;
        }
      )
      this.fetchExtraInfo();
  }

  async ngOnInit() {
    this.role = this.auth.getRole();
    
    if (this.role == "Pacient")
    {
      this.editable = false;
      this.rows=this.rowsDefaultAll;
      await this.fetchAllTesults();
    }
    else if (this.role = "Doctor_Specialist") {
      this.editable = true;
      if(this.type == "pre"){
      //dac a e predonare randare predonare, daca e post, randare post
      this.rows = this.rowsDefaultPre;
      await this.fetchTestsTesultsPreDonation();
      }
      else if(this.type == "post"){
        this.rows = this.rowsDefaultPost;
        await this.fetchTestsTesultsPostDonation();
      }
    }

    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
   
    var self = this;
    setTimeout(function () { self.addRow(); }, 1000);

   
  }

  async ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
    
  }


async fetchExtraInfo(){
 await this.pacient.getExtraInfoForTestsResults().subscribe((result: any[]) => {
    this.extraInfo = result;
  });
}

  async fetchTestsTesultsPreDonation() {
    await this.appointmentService.getAllPreDonationTests(this.donationFormId).subscribe((r) => this.getTestsData(r.body));
  }

  async fetchTestsTesultsPostDonation() {
    await this.appointmentService.getAllPostDonationTests(this.donationFormId).subscribe((r) => this.getTestsData(r.body));
  }

  async fetchAllTesults() {
    await this.appointmentService.getAllTests(this.donationFormId).subscribe((r) => this.getTestsData(r.body));
  }

  async getTestsData(data: any) {
    await this.rows.map((r) => {
      r.Valoare = data[r.Parametru.toLowerCase()]
    })
  }

  initiateForm(data: any): FormGroup {
    return this.fb.group({
      Valoare: [data.Valoare],
      Parametru: [data.Parametru],
      UM: [data.UM]
    });
  }

  addRow() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.rows.forEach(row => control.push(this.initiateForm(row)));
  }


  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  async submitForm() {


  
    const control = this.userTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    if (this.role = "Doctor_Specialist"){
      if(this.type == "pre"){
        this.rows = this.rowsDefaultPre;
        await this.addPreTestResults();
        //appointment status pending
        this.appointmentService.changeAppointmentStatus(this.appointment_id, "pending").subscribe() ;
        }
        else if(this.type == "post"){
          this.rows = this.rowsDefaultPost;
          await this.addPostTestResults();
          //appointment status completed
          this.appointmentService.changeAppointmentStatus(this.appointment_id, "completed").subscribe();
          this.pacient.changePacientStatus("pending",this.donor_code ).subscribe();
        }
     
     }

   // this.addTestsResults();
    this.router.navigate(['/doctor-home']);
   

  }

  toggleTheme() {
    this.mode = !this.mode;
  }




  async addTestsResults() {
    var jsonDataPost = {};
    var jsonDataPre = {};

    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().split('T')[0];
    this.touchedRows.forEach((column) => {
      var columnName = column.Parametru;
      //daca parametrul nu e in lista predefinita pentru postdonare, il punem in predonare
      if (!this.list.includes(column.Parametru)) {
        jsonDataPre[columnName] = column.Valoare;
      }
      else
        jsonDataPost[columnName] = column.Valoare;
    });

    jsonDataPost["cod_donator"] = this.donor_code;
    jsonDataPre["cod_donator"] = this.donor_code;

    jsonDataPost["completedAt"] = localISOTime;
    jsonDataPre["completedAt"] = localISOTime;
    let id_analize_pre_donare = await this.postPredonareData(jsonDataPre).catch();
    let id_analize_post_donare = await this.postPostdonareData(jsonDataPost).catch();

    this.addTestsMongoIds(this.donationFormId, id_analize_pre_donare, id_analize_post_donare);

  }



  async addPreTestResults(){
    var jsonDataPre = {};
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().split('T')[0];
    this.touchedRows.forEach((column) => {
      var columnName = column.Parametru;
        jsonDataPre[columnName] = column.Valoare;

    });

    jsonDataPre["cod_donator"] = this.donor_code;
    jsonDataPre["completedAt"] = localISOTime;

    this.id_analize_pre_donare = await this.postPredonareData(jsonDataPre).catch();
    console.log("PRE->>" + this.id_analize_pre_donare);
   // this.addTestsMongoIds(this.donationFormId, this.id_analize_pre_donare, 0);
  }

  async addPostTestResults(){
    var jsonDataPost = {};


    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().split('T')[0];
    this.touchedRows.forEach((column) => {
      var columnName = column.Parametru;
        jsonDataPost[columnName] = column.Valoare;
    });

    jsonDataPost["cod_donator"] = this.donor_code;
    jsonDataPost["completedAt"] = localISOTime;
    let id_analize_post_donare = await this.postPostdonareData(jsonDataPost).catch();
    console.log("PRE->>" + this.id_analize_pre_donare);
    this.addTestsMongoIds(this.donationFormId, this.id_analize_pre_donare, id_analize_post_donare);

  }



  postPredonareData(jsonDataPre): Promise<any> {
    return new Promise<any>((resolve) => {
      setTimeout(async () => {
        (await this.appointmentService.postPreDonare(jsonDataPre).subscribe(idpredonare => resolve(idpredonare)))
      }, 100)
    });
  }

  postPostdonareData(jsonDataPost): Promise<any> {
    return new Promise<any>((resolve) => {
      setTimeout(async () => {
        (await this.appointmentService.postPostDonare(jsonDataPost).subscribe(idpostdonare => resolve(idpostdonare)))
      }, 100)
    });
  }

  addTestsMongoIds(donationFormId, id_analize_pre_donare, id_analize_post_donare) {
    this.appointmentService.addAnalizeIDs(donationFormId, id_analize_pre_donare, id_analize_post_donare).subscribe();
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

