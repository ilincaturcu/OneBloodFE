import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtClientService } from './jwt-client.service';
import { PacientService } from './pacient.service';

@Injectable()
export class AppointmentGuardsService implements CanActivate {
  constructor(public auth: JwtClientService, public router: Router, public pacientService: PacientService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const expectedPacientStatus = route.data.expectedPacientStatus;
    const status = await this.checkStatusAsPromise();
    const current = await this.checkDonorDoesNotHaveAnAppPromise();
    if (!this.auth.isAuthenticated() || status !== expectedPacientStatus || current == 'true') {
      if (status !== expectedPacientStatus)
        window.alert("Ne pare rău, dar nu sunteți eligibili pentru a face o programare");
      else
        window.alert("Ne pare rău, dar ați făcut o programare deja");

      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }


  public checkStatusAsPromise(): Promise<string> {
    var donor_code = this.auth.getDonorCode();
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        this.pacientService.getPacientStatus(donor_code).subscribe(status => resolve(status))
      }, 300)
    });
  }

  public checkDonorDoesNotHaveAnAppPromise(): Promise<string> {
    var donor_code = this.auth.getDonorCode();
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        this.pacientService.doesTheDonorHaveAnApp(donor_code).subscribe(status => resolve(status))
      }, 300)
    });
  }
}
