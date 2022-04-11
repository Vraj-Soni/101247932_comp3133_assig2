import { Component, OnInit } from '@angular/core';
import { registerModel } from './../../models/register';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



const Login_User = gql`
query login($username: String!,$password: String!) {
    login( username: $username,password:$password ) {
      token
    }
  }
`;
// const Login_User = gql`
//   query login($username: String!,$password: String!) {
//     login({ username: $username,password:$password }) {
//       token
//     }
//   }
// `;

// const Login_User = gql`
//   {
//     login {
//       login {
//        token
//       }
//     }
//   }
// `;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: any;
  user = new registerModel();
  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {

  }

  login() {
    this.apollo
      .query({
        query: Login_User,
        variables: {
          username: this.user.userName,
          password: this.user.password,
        },
      })
      .subscribe((res: any) => {
        if (res.data.login.token) {
          localStorage.setItem('token', res.data.login.token);
          alert('Login Successfull');
          this.router.navigateByUrl('/listing')
        } else {
          alert('invalid user')
        }

      });
  }




}
