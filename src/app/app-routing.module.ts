import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';

import { CalendarDoctorComponent } from './calendar-doctor/calendar-doctor.component';
import { ExamenMedicalComponent } from './examen-medical/examen-medical.component';
import { HomePacientComponent } from './home-pacient/home-pacient.component';
import { MedicalResultsComponent } from './medical-results/medical-results.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuizComponent } from './quiz/quiz.component';
import { RegisterComponent } from './register/register.component';
import { TestsResultsComponent } from './tests-results/tests-results.component';

const routes: Routes = [
  { path: '', component: HomePacientComponent },
  { path: 'chestionarAutoexcludere', component: QuestionsComponent },
  { path : 'programare', component : AppointmentComponent},
  { path : 'medical-results', component : MedicalResultsComponent},
  { path : 'calendar-doctor', component : CalendarDoctorComponent},
  { path : 'fisa-donare', component : TestsResultsComponent},
  { path : 'examen-medical', component : ExamenMedicalComponent},
  { path : 'register', component : RegisterComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
