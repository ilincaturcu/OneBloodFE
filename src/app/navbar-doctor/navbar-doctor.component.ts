import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtClientService } from '../services/jwt-client.service';

@Component({
  selector: 'app-navbar-doctor',
  templateUrl: './navbar-doctor.component.html',
  styleUrls: ['./navbar-doctor.component.scss']
})
export class NavbarDoctorComponent implements OnInit {

  ngOnInit(): void {
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
}
