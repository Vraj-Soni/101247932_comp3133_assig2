import { Component, OnInit } from '@angular/core';
import { registerModel } from './../../models/register';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


const CREATE_User = gql`
  mutation createAdmin($username: String!,$firstname: String!,$lastname: String!,$email: String!,$password: String!, $type: String!) {
    createAdmin(adminInput: { username: $username,firstname:$firstname,lastname:$lastname, email: $email,password:$password,type:$type }) {
      _id
      username
      email
    }
  }
`;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  users: any;
  user = new registerModel();
  constructor(private apollo: Apollo,private router:Router) { }

  ngOnInit(): void {
    this.user.type = 'user';
  }

  create(f: NgForm) {
    this.apollo
      .mutate({
        mutation: CREATE_User,
        variables: {
          username: this.user.userName,
          firstname: this.user.firstName,
          lastname: this.user.lastName,
          email: this.user.email,
          password: this.user.password,
          type: this.user.type
        },
      })
      .subscribe(() => {
        f.resetForm();
        this.user.type = 'user';
        alert('User register');
        this.router.navigateByUrl('/login')
      });
  }




}
