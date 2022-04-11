
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Listing = require('../../models/listing');
const Booking = require('../../models/booking');
const Quote = require('../../models/quote');

function isEmailValid(email) {
  const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!email)
    return false;

  if (email.length > 254)
    return false;

  var valid = emailRegex.test(email);
  if (!valid)
    return false;

  // Further checking of some things regex can't handle
  var parts = email.split("@");
  if (parts[0].length > 64)
    return false;

  var domainParts = parts[1].split(".");
  if (domainParts.some(function (part) { return part.length > 63; }))
    return false;

  return true;
}

function isPasswordValid(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/;
  var valid = passwordRegex.test(password);
  if (!valid) {
    return false;
  }
  return true;
}

module.exports = {
  createAdmin: async function ({ adminInput }) {
    console.log('in user input' + JSON.stringify(adminInput))
    const user = new User({
      username: adminInput.username,
      firstname: adminInput.firstname,
      lastname: adminInput.lastname,
      email: adminInput.email,
      password: adminInput.password,
      type: adminInput.type
    });
    const createdUser = await user.save();
    return {
      ...createdUser._doc,
      _id: createdUser._id.toString(),
    };
  },




  //login user
  login: async ({ username, password }) => {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error('User does not exist!');
    }
    if (password != user.password) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username, role: user.type },
      'myassignment123',
      {
        expiresIn: '1h'
      }
    );
    return { userId: user._id, token: token, tokenExpiration: 1 };
  },

  // //create new listing
  // createListing: async (args, req) => {
  //   console.log('hir')
  //   return;
  //   try {
  //     const listing = new Listing({
  //       listing_id: args.listingInput.listing_id,
  //       listing_title: args.listingInput.listing_title,
  //       description: args.listingInput.description,
  //       street: args.listingInput.street,
  //       city: args.listingInput.city,
  //       postal_code: args.listingInput.postal_code,
  //       price: args.listingInput.price,
  //       creator: req.username,
  //       creatorRole: req.userRole
  //     });

  //     const result = await listing.save();

  //     return { ...result._doc, _id: result.id };
  //   } catch (err) {
  //     throw err;
  //   }
  // },


  createListing: async function ({ listingInput }) {
    console.log('in listing input' + JSON.stringify(listingInput))
      const listing = new Listing({
        listing_id: listingInput.listing_id,
        listing_title: listingInput.listing_title,
        description: listingInput.description,
        street: listingInput.street,
        city: listingInput.city,
        postal_code: listingInput.postal_code,
        price: listingInput.price,
        creator: 'admin',
        creatorRole: 'admin'
      });

      const createdList = await listing.save();
      return {
        ...createdList._doc,
        _id: createdList._id.toString(),
      };
     },


    //view all listing
    getAdminListing: async (args, req) => {
      try {
        const listing = await Listing.find({ creatorRole: 'admin' });
        return listing.map(listing => {
          return {
            ...listing._doc,
            _id: listing.id,
            // creator: user.bind(this, event._doc.creator)
          };
        });
      } catch (err) {
        throw err;
      }
    },


      //view all login admin listing
      getAdminLoginListing: async (args, req) => {
        try {
          const listing = await Listing.find({ creator: req.username });
          return listing.map(listing => {
            return {
              ...listing._doc,
              _id: listing.id,
            };
          });
        } catch (err) {
          throw err;
        }
      },


        //get listing by title
        getListingByTitle: async (args, req) => {
          try {
            const listing = await Listing.find({ listing_title: args.title });
            return listing.map(listing => {
              return {
                ...listing._doc,
                // _id: listing.id,
                // listing_title: listing.listing_title,
              };
            });
          } catch (err) {
            throw err;
          }
        },


          //get listing by city
          getListingByCity: async (args, req) => {
            try {
              const listing = await Listing.find({ city: args.city });
              return listing.map(listing => {
                return {
                  ...listing._doc,
                  // _id: listing.id,
                  // listing_title: listing.listing_title,
                };
              });
            } catch (err) {
              throw err;
            }
          },



            //get listing by postal
            getListingByPostal: async (args, req) => {
              try {
                const listing = await Listing.find({ postal_code: args.postal_code });
                return listing.map(listing => {
                  return {
                    ...listing._doc,
                    // _id: listing.id,
                    // listing_title: listing.listing_title,
                  };
                });
              } catch (err) {
                throw err;
              }
            },


              //create new booking
              createBooking: async (args, req) => {
                try {
                  const booking = new Booking({
                    listing_id: args.bookingInput.listing_id,
                    booking_id: args.bookingInput.booking_id,
                    booking_date: args.bookingInput.booking_date,
                    booking_start: args.bookingInput.booking_start,
                    booking_end: args.bookingInput.booking_end,
                    username: args.bookingInput.username,
                    creator: req.username,
                    creatorRole: req.userRole
                  });

                  const result = await booking.save();

                  return { ...result._doc, _id: result.id };
                } catch (err) {
                  throw err;
                }
              },


                //get all user booking
                getAllUserBookings: async (args, req) => {
                  if (!req.isAuth) {
                    throw new Error('Unauthenticated!');
                  }
                  try {
                    const booking = await Booking.find({ creator: req.username });
                    return booking.map(booking => {
                      return {
                        ...booking._doc,
                      };
                    });
                  } catch (err) {
                    throw err;
                  }
                },


};
