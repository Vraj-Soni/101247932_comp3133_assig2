import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache,ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const uri = 'http://localhost:3000/graphql';

export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('token');

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  }
}

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink]
  }]
})
export class GraphQLModule {}

// import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
// import { HttpLink } from 'apollo-angular/http';
// import { InMemoryCache,ApolloLink } from '@apollo/client/core';
// import { setContext } from '@apollo/client/link/context';

// const uri = 'http://localhost:3000/graphql'; // <-- add the URL of the GraphQL server here

// export function createApollo(httpLink: HttpLink) {
//   const basic = setContext((operation, context) => ({
//     headers: {
//       Accept: 'charset=utf-8'
//     }
//   }));

//   const auth = setContext((operation, context) => {
//     const token = localStorage.getItem('token');

//     if (token === null) {
//       return {};
//     } else {
//       return {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       };
//     }
//   });

//   const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
//   const cache = new InMemoryCache();

//   return {
//     link,
//     cache
//   }
// }

// @NgModule({
//   exports: [
//     HttpClientModule,
//     ApolloModule,
//   ],
//   providers: [{
//     provide: APOLLO_OPTIONS,
//     useFactory: createApollo,
//     deps: [HttpLink]
//   }]
// })
// export class GraphQLModule {}

// import {NgModule} from '@angular/core';
// import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
// import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
// import {HttpLink} from 'apollo-angular/http';

// const uri = 'http://localhost:3000/graphql'; // <-- add the URL of the GraphQL server here
// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
//   return {
//     link: httpLink.create({uri}),
//     cache: new InMemoryCache(),
//   };
// }

// @NgModule({
//   exports: [ApolloModule],
//   providers: [
//     {
//       provide: APOLLO_OPTIONS,
//       useFactory: createApollo,
//       deps: [HttpLink],
//     },
//   ],
// })
// export class GraphQLModule {}
