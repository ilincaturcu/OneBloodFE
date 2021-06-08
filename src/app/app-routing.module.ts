import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { ExamenMedicalComponent } from './examen-medical/examen-medical.component';
import { HomePacientComponent } from './home-pacient/home-pacient.component';
import { LoginComponent } from './login/login.component';
import { MedicalResultsComponent } from './medical-results/medical-results.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuizComponent } from './quiz/quiz.component';
import { RegisterComponent } from './register/register.component';
import { RoleGuardsService as RoleGuard} from './services/role-guards.service';
import { TestsResultsComponent } from './tests-results/tests-results.component';
import {AppointmentGuardsService as AppGuard} from './services/appointment-guards.service';
import { QuizGuardsService as QuizGuard} from './services/quiz-guards.service';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { IstoricProgramariComponent } from './istoric-programari/istoric-programari.component';
//import { AuthGuardService as AuthGuard, } from '../voluntari/services/auth.guard';


const routes: Routes = [
  { path: '', component: HomePacientComponent },
  { path: 'chestionarAutoexcludere', component: QuestionsComponent, canActivate: [QuizGuard], data: {expectedResponse : 'true'} },
  { path : 'programare', component : AppointmentComponent, canActivate: [AppGuard], data: { expectedPacientStatus: 'valid'} },
  { path : 'medical-results', component : MedicalResultsComponent, canActivate: [RoleGuard], data: { expectedRole: 'Pacient'} },
  { path : 'istoric-programari', component : IstoricProgramariComponent, canActivate: [RoleGuard], data: { expectedRole: 'Doctor_Specialist'} },
  { path : 'tests-results/:id', component : TestsResultsComponent, canActivate: [RoleGuard], data: { expectedRole: 'Pacient'} },
  { path : 'tests-results-doctor/:id/:donorCode/:type/:appId', component : TestsResultsComponent, canActivate: [RoleGuard], data: { expectedRole: 'Doctor_Specialist'} },
  { path : 'examen-medical', component : ExamenMedicalComponent, canActivate: [RoleGuard], data: { expectedRole: 'Pacient'} },
  { path : 'register', component : RegisterComponent},
  { path : 'login', component : LoginComponent},
  { path : 'home', component : HomePacientComponent},
  { path : 'doctor-home', component : DoctorHomeComponent, canActivate: [RoleGuard], data: { expectedRole: 'Doctor_Specialist'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
