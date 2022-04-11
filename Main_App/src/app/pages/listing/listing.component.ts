import { Component, OnInit } from '@angular/core';
import { registerModel } from './../../models/register';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

const CREATE_BOOKING = gql`
  mutation createBooking($listing_id: String!,$booking_id: String!,$booking_date: String!,$booking_start: String!,$booking_end: String!, $username: String!) {
    createBooking(bookingInput: { listing_id: $listing_id,booking_id:$booking_id,booking_date:$booking_date, booking_start: $booking_start,booking_end:$booking_end,username:$username }) {
      username
      listing_id
    }
  }
`;

const All_Listing = gql`
query getAdminListing {
  getAdminListing{
    listing_id
    listing_title
    description
    street
    city
    postal_code
    price

    }
  }
`;


const Search_Title = gql`
query getListingByTitle($title: String!) {
  getListingByTitle(title:$title){
    listing_id
    listing_title
    description
    street
    city
    postal_code
    price

    }
  }
`;

const Search_City = gql`
query getListingByCity($city: String!) {
  getListingByCity(city:$city){
    listing_id
    listing_title
    description
    street
    city
    postal_code
    price

    }
  }
`;

const Search_Postal = gql`
query getListingByPostal($postal_code: String!) {
  getListingByPostal(postal_code:$postal_code){
    listing_id
    listing_title
    description
    street
    city
    postal_code
    price
  
    }
  }
`;

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  searchName: string;
  searchCity: string;
  searchPostalCode: string;

  listing: any;
  isBooking: boolean = false;
  bookingDate: any;
  bookingStart: any;
  bookingEnd: any;
  constructor(private apollo: Apollo, private router: Router) { }


  role: string;
  ngOnInit(): void {
    this.getAllAdminListing();
    if (localStorage.getItem('token')) {
      let user = this.getDecodedAccessToken(localStorage.getItem('token'))
      if (user) {
        this.role = user.role;
      
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


  getAllAdminListing() {
    this.apollo
      .query({
        query: All_Listing
      })
      .subscribe((res: any) => {
        this.listing = res.data.getAdminListing
      });
  }


  bookingData: any
  createBooking(item: any) {
    let token = localStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/login')
    }
    this.isBooking = true;
    this.bookingData = item

  }


  saveBooking(f: NgForm) {
    this.isBooking = true;
    this.apollo
      .mutate({
        mutation: CREATE_BOOKING,
        variables: {
          listing_id: this.bookingData.listing_id,
          booking_id: '7485',
          booking_date: this.bookingDate,
          booking_start: this.bookingStart,
          booking_end: this.bookingEnd,
          username: 'usamach'
        },
      })
      .subscribe((res: any) => {
        this.isBooking = false;
        alert('Booking Successfull')
        f.resetForm();
        location.reload();

      });
  }


  searchByName() {
    this.listing = []
    this.apollo
      .query({
        query: Search_Title,
        variables: {
          title: this.searchName,
        },
      })
      .subscribe((res: any) => {
        this.listing = res.data.getListingByTitle


      });
  }


  searchByCity() {
    this.listing = []
    this.apollo
      .query({
        query: Search_City,
        variables: {
          city: this.searchCity,
        },
      })
      .subscribe((res: any) => {
        this.listing = res.data.getListingByCity


      });
  }

  searchByPostal() {
    this.listing = []
    this.apollo
      .query({
        query: Search_Postal,
        variables: {
          postal_code: this.searchPostalCode,
        },
      })
      .subscribe((res: any) => {
        this.listing = res.data.getListingByPostal


      });
  }
}
