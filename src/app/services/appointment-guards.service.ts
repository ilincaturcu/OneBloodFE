import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtClientService } from './jwt-client.service';
import { PacientService } from './pacient.service';

@Injectable()
export class AppointmentGuardsService implements CanActivate {
  constructor(public auth: JwtClientService, public router: Router, public pacientService: PacientService) { }

  async canActivate(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Promise<boolean> {
    const expectedPacientStatus = route.data.expectedPacientStatus;
      const status = await this.checkStatusAsPromise();
      const current = await this.checkDonorDoesNotHaveAnAppPromise();
      if (!this.auth.isAuthenticated() || status !== expectedPacientStatus || current==true) {
        //TODO
      //DIALOG CU NE PARE RAU DAR NU PUTETI FACE O PROGRMAARE :(
        return false;
      }
      return true;
  }


  public checkStatusAsPromise(): Promise<string> {
    var donor_code = this.auth.getDonorCode();
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        this.pacientService.getPacientStatus(donor_code).subscribe(status =>resolve(status))
      }, 300)
    });
  }

  public checkDonorDoesNotHaveAnAppPromise(): Promise<boolean> {
    var donor_code = this.auth.getDonorCode();
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        this.pacientService.doesTheDonorHaveAnApp(donor_code).subscribe(status =>resolve(status))
      }, 300)
    });
  }
}
