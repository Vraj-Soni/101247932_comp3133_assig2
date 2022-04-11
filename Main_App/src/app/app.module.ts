import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ListingComponent } from './pages/listing/listing.component';
import { HeaderComponent } from './pages/header/header.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { AddListingComponent } from './pages/newListing/addListing.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ListingComponent,
    HeaderComponent,
    BookingsComponent,
    AddListingComponent
  ],
  imports: [

  FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
