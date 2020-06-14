import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ProfileComponent } from './user/profile/profile.component';
import { EmployeeListComponent } from './user/employee-list/employee-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { ReviewsComponent } from './user/reviews/reviews.component';
import { ReviewListComponent } from './user/review-list/review-list.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:SignUpComponent},
  {path: '', component:HomeComponent},
  {path: 'employees', component:EmployeeListComponent},
  {path:'profile', component:ProfileComponent, canActivate: [AuthGuard]},
  {               
    path:'reviews/:type/:id/:name', 
    component:ReviewsComponent
  },
  {path: 'reviewsList/:id', component:ReviewListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
