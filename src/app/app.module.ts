import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InfoComponent } from './info/info.component';
import { HomePacientComponent } from './home-pacient/home-pacient.component';
import { QuizComponent } from './quiz/quiz.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MedicalResultsComponent } from './medical-results/medical-results.component';
import { TestsResultsComponent } from './tests-results/tests-results.component';
import { InformationalModalComponent } from './informational-modal/informational-modal.component';
import { QuestionsComponent } from './questions/questions.component';
import { ResultsComponent } from './results/results.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DemoMaterialModule } from './material.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarDoctorComponent } from './calendar-doctor/calendar-doctor.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ExamenMedicalComponent } from './examen-medical/examen-medical.component';
import { AnalizeDonatorComponent } from './analize-donator/analize-donator.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NavbarComponent } from './navbar/navbar.component';
import { DialogComponent } from './dialog/dialog.component';
import { RoleGuardsService } from './services/role-guards.service';
import { AuthGuardService } from './services/auth-guards.service';
import { AppointmentGuardsService } from './services/appointment-guards.service';
import { QuizGuardsService } from './services/quiz-guards.service';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InfoComponent,
    HomePacientComponent,
    QuizComponent,
    AppointmentComponent,
    MedicalResultsComponent,
    TestsResultsComponent,
    InformationalModalComponent,
    QuestionsComponent,
    ResultsComponent,
    CalendarDoctorComponent,
    ExamenMedicalComponent,
    AnalizeDonatorComponent,
    NavbarComponent,
    DialogComponent,
    DoctorHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    DemoMaterialModule,
    CalendarModule,
    BrowserAnimationsModule,
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [RoleGuardsService, AuthGuardService, AppointmentGuardsService, QuizGuardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
