import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtClientService } from './jwt-client.service';


@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public auth: JwtClientService, public router: Router) {}
    
    canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      window.alert("Ne pare rău, dar nu aveți acces");
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }}