import { Component, OnInit } from '@angular/core';
import { registerModel } from './../../models/register';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NgForm } from '@angular/forms';
import { listingModel } from './../../models/listing';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

const CREATE_Listing = gql`
  mutation createListing($listing_id: String!,$listing_title: String!,$description: String!,$street: String!,$city: String!, $postal_code: String!,$price:String!) {
    createListing(listingInput: { listing_id: $listing_id,listing_title:$listing_title,description:$description, street: $street,city:$city,postal_code:$postal_code,price: $price }) {
     listing_id
    }
  }
`;


@Component({
  selector: 'app-addListing',
  templateUrl: './addListing.component.html',
  styleUrls: ['./addListing.component.scss']
})
export class AddListingComponent implements OnInit {

  user: any;
  role: any;
  listing = new listingModel();
  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let user = this.getDecodedAccessToken(localStorage.getItem('token'))
      if (user.role == 'admin') {
        this.role = user.role;
      } else {
        this.router.navigateByUrl('/login')
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
  create(f: NgForm) {
    this.apollo
      .mutate({
        mutation: CREATE_Listing,
        variables: {
          listing_id: this.listing.listing_id,
          listing_title: this.listing.listing_title,
          description: this.listing.description,
          street: this.listing.street,
          city: this.listing.city,
          postal_code: this.listing.postal_code,
          price: this.listing.price
        },
      })
      .subscribe(() => {
        f.resetForm();
        alert('New Listing Created');
        this.router.navigateByUrl('/listing');
      });
  }




}
