import { Component, OnInit } from '@angular/core';
import { registerModel } from './../../models/register';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  role: any
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let user = this.getDecodedAccessToken(localStorage.getItem('token'))
      if (user) {
        this.role = user.role;
        console.log('role' + this.role)
      }

    }

  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }
}
