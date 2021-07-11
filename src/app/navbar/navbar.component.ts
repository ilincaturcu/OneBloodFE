import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtClientService } from '../services/jwt-client.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  role;
  async ngOnInit() {
    this.role = await this.auth.getRole();
  }

  public selected;
  public S;
  name = '';
  constructor(public dialog: MatDialog, private auth: JwtClientService, private router: Router) {
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
