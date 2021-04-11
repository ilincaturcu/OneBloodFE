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
import { CalendarDoctorComponent } from './calendar-doctor/calendar-doctor.component';
import { TestsResultsComponent } from './tests-results/tests-results.component';
import { InformationalModalComponent } from './informational-modal/informational-modal.component';

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
    CalendarDoctorComponent,
    TestsResultsComponent,
    InformationalModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
