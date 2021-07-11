import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { JwtClientService } from './jwt-client.service';
import { PacientService } from './pacient.service';


@Injectable()
export class RoleGuardsService implements CanActivate {
  constructor(public auth: JwtClientService, public router: Router, public pacientService: PacientService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const role = sessionStorage.getItem('Role');
    if (!this.auth.isAuthenticated() || role !== expectedRole) {
      window.alert("Ne pare rău, dar nu aveți acces");
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}