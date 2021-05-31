import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtClientService } from './jwt-client.service';
import { PacientService } from './pacient.service';



@Injectable()
export class QuizGuardsService implements CanActivate {
    constructor(public auth: JwtClientService, public router: Router, public pacientService : PacientService) {

    }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const expectedResponse = route.data.expectedResponse;
    const response = await this.checkStatusAsPromise();
    console.log('#############')
    console.log(response)
    console.log(expectedResponse)
    if (!this.auth.isAuthenticated() || response !== expectedResponse) {
      this.router.navigate(['/home']);
      return false;
    }
    console.log('&&&&&')
    return true;
  }


  public checkStatusAsPromise(): Promise<any> {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        this.auth.canDonorCompleteTheQuiz().subscribe(status =>resolve(status))
      }, 300)
    });
  }
}