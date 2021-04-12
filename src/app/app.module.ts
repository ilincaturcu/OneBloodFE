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
import { DemoComponent } from './calendar-doctor/calendar-doctor.component';

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
    DemoComponent
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
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
