import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ListingComponent } from './pages/listing/listing.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { AddListingComponent } from './pages/newListing/addListing.component';
const routes: Routes = [
  { path: '', redirectTo: 'listing', pathMatch: 'full' },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'listing',
    component: ListingComponent
  },
  {
    path: 'listing/new',
    component: AddListingComponent
  },
  {
    path: 'bookings',
    component: BookingsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],




  exports: [RouterModule]
})
export class AppRoutingModule { }
