import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtClientService } from './jwt-client.service';
import { PacientService } from './pacient.service';



@Injectable()
export class QuizGuardsService implements CanActivate {
    constructor(public auth: JwtClientService, public router: Router, public pacientService : PacientService) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const expectedResponse = route.data.expectedResponse;
    const response = await this.checkStatusAsPromise();
    if (!this.auth.isAuthenticated() || response !== expectedResponse) {
      window.alert("Ne pare rău, dar ați completat formularul deja.");
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }


  public checkStatusAsPromise(): Promise<any> {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        this.auth.canDonorCompleteTheQuiz().subscribe((status) =>{
          if (status != null ) resolve(status);
          })
      }, 300)
    });
  }
}