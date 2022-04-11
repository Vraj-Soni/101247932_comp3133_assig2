const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Person {
  _id: ID!
  username: String!
  firstname: String!
  lastname: String!
  email: String!
  password: String!
  type:String!
}


input InputPersonData {
  _id: ID!
  username: String!
  firstname: String!
  lastname: String!
  email: String!
  password: String!
  type:String!
}



type Booking {
  _id: ID!
  listing_id: String!
  booking_id: String!
  booking_date: String!
  booking_start: String!
  booking_end: String!
  username:String!
}

type Listing {
  _id: ID!
  listing_id: String!
  listing_title: String!
  description: String!
  street: String!
  city: String!
  postal_code:String!
  price:String!

}

type User {
  _id: ID!
  username: String!
  firstname: String!
  lastname: String!
  email: String!
  password: String
  type:String!
}

type Admin {
  _id: ID!
  username: String!
  firstname: String!
  lastname: String!
  email: String!
  password: String
  type:String!
}


input AdminInputData {
  username: String!
  firstname: String!
  lastname: String!
  email: String!
  password: String
  type:String!
}

type AuthData {
  _id: ID!
  token: String!
  tokenExpiration: Int!
}

input UserInput {
  username:String!
  firstname:String!
  lastname:String!
  email: String!
  password: String!
  type: String!
}


input ListingInput {
  listing_id: String!
  listing_title: String!
  description: String!
  street: String!
  city: String!
  postal_code:String!
  price:String!

}


input BookingInput {
  listing_id: String!
  booking_id: String!
  booking_date: String!
  booking_start: String!
  booking_end: String!
  username:String!
}


type RootQuery {
   login(username: String!, password: String!): AuthData!  
    users: [User!]!
    getUsers: [User]!
    getUser(id: ID!): User
    listings: [Listing!]!
    getListings: [Listing]!
    getListing(id: ID!): Listing!
    getListingByTitle(title: String!): [Listing!]!
    getListingByCity(city: String!): [Listing!]!
    getListingByPostal(postal_code: String!): [Listing!]!
    getAdminListing: [Listing!]!
    getAdminLoginListing: [Listing!]!
    getAllUserBookings: [Booking!]!
}

type RootMutation {
    createAdmin(adminInput: AdminInputData): Admin!
    createPerson(personInput: InputPersonData): Person!
    createUser(userInput: UserInput): User!
    createListing(listingInput: ListingInput): Listing
    createBooking(bookingInput: BookingInput): Booking
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
