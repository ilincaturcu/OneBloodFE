import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';

import { DemoComponent } from './calendar-doctor/calendar-doctor.component';
import { HomePacientComponent } from './home-pacient/home-pacient.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: '', component: HomePacientComponent },
  { path: 'chestionarAutoexcludere', component: QuestionsComponent },
  { path : 'programare', component : AppointmentComponent},
  { path : 'calendar-doctor', component : DemoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
