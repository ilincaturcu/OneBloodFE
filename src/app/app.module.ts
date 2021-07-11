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
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ExamenMedicalComponent } from './examen-medical/examen-medical.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NavbarComponent } from './navbar/navbar.component';
import { DialogComponent } from './dialog/dialog.component';
import { RoleGuardsService } from './services/role-guards.service';
import { AuthGuardService } from './services/auth-guards.service';
import { AppointmentGuardsService } from './services/appointment-guards.service';
import { QuizGuardsService } from './services/quiz-guards.service';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { IstoricProgramariComponent } from './istoric-programari/istoric-programari.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ContactComponent } from './contact/contact.component';
import { MatPaginatorIntl } from '@angular/material/paginator';

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
    QuestionsComponent,
    ResultsComponent,
    ExamenMedicalComponent,
    NavbarComponent,
    DialogComponent,
    DoctorHomeComponent,
    IstoricProgramariComponent,
    ContactComponent,
   
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
    ImageCropperModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [RoleGuardsService, AuthGuardService, AppointmentGuardsService, QuizGuardsService, MatPaginatorIntl],
  bootstrap: [AppComponent]
})
export class AppModule { }
