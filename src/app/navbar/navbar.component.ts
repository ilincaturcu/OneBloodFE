import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  ngOnInit(): void {
  }


  public selected;
  public S;
  name = '';
  constructor(public dialog: MatDialog) {
  }

  openLogoutDialog() {

  }



}
