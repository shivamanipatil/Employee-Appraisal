import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './user/login/login.component'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio'; 
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './user/profile/profile.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { ProfileService } from './user/profile/profile.service';
import { EmployeeListService } from './user/employee-list/employee-list.service';
import { ReviewsService } from './user/reviews/reviews.service';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import { EmployeeListComponent } from './user/employee-list/employee-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReviewsComponent } from './user/reviews/reviews.component';
import { MatSliderModule } from '@angular/material/slider'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    SignUpComponent,
    ProfileComponent,
    EmployeeListComponent,
    ReviewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule,
    MatRadioModule,
    MatExpansionModule,
    MatChipsModule,
    MatListModule,
    MatGridListModule,
    MatSliderModule
  ],
  providers: [AuthService, AuthGuard, ProfileService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, EmployeeListService, ReviewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
