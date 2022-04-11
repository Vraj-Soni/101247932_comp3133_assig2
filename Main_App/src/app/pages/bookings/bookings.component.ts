import { Component, OnInit } from '@angular/core';
import { registerModel } from './../../models/register';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NgForm } from '@angular/forms';




const All_Bookings = gql`
query getAllUserBookings {
  getAllUserBookings{
    listing_id
    booking_id
    booking_date
    booking_start
    booking_end
    username
    }
  }
`;

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  bookings: any;
  isBooking: boolean = false;
  bookingDate: any;
  bookingStart: any;
  bookingEnd: any;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.getAllBookings();
  }

  afterViewInit() {
    this.getAllBookings();
  }

  getAllBookings() {
    this.apollo
      .query({
        query: All_Bookings
      })
      .subscribe((res: any) => {
        console.log('res' + JSON.stringify(res))
        this.bookings = res.data.getAllUserBookings
      });
  }




}
