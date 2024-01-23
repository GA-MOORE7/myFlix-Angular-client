import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from '@angular/cdk/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { AppComponent } from './app.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfileComponent } from './profile-page/profile-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GenreComponent } from './genre/genre.component';
import { DirectorComponent } from './director/director.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfileComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    /** @component AppComponent */
    AppComponent,

    /** @component UserRegistrationFormComponent */
    UserRegistrationFormComponent,

    /** @component UserLoginFormComponent */
    UserLoginFormComponent,

    /** @component MovieCardComponent */
    MovieCardComponent,

    /** @component WelcomePageComponent */
    WelcomePageComponent,

    /** @component ProfileComponent */
    ProfileComponent,

    /** @component NavbarComponent */
    NavbarComponent,

    /** @component GenreComponent */
    GenreComponent,

    /** @component DirectorComponent */
    DirectorComponent,

    /** @component MovieDetailsComponent */
    MovieDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DialogModule,
    FormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }