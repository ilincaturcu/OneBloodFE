import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtClientService } from '../services/jwt-client.service';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.scss']
})
export class NavbarHomeComponent implements OnInit {
 

  constructor(public dialog: MatDialog, private auth: JwtClientService, private router: Router) { }

  ngOnInit(): void {
  }

  redirectToLogin(){
    this.router.navigate(['/login']);
  }

}
