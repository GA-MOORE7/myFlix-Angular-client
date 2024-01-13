import { Component, Input, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any = { Username: '', Password: '', Email: '', Birth: '' };
  favouriteMovies : any[] = [];
  constructor(public fetchApi: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

   /**
   * first this component loaded, it will load the current user data, update localstorage
   */
  ngOnInit(): void {
    this.loadUser();
  }

  public loadUser(): void {
    this.user = this.fetchApi.getOneUser();
    this.fetchApi.getAllMovies().subscribe((response) => {
      this.favouriteMovies = response.filter((movie: any) => this.user.favourite_movies.includes(movie._id));
    });
  }
/**
 * this will redirect to the home page
 */
  public back(): void {
    this.router.navigate(['movies']);
  }
   /**
   * this opens the update dialog to update the current user data
   */
  // public updateUser(): void {
  //   // Used registartionComponent with another shared variables
  //   this.dialog.open(UserRegistrationFormComponent, { width: '400px', height: '400px', data: { title: 'UPDATE USER', button: 'Update', function: 'updateUser()' } });
  //   this.fetchApi.currentUser.subscribe(userData => this.user = userData);
  // }
   /**
   * delete the current user account and navigate to the welcome page
   */
  // public deregisterUser(): void {
  //   this.fetchApi.deleteUser().subscribe((response) => {
  //       console.log('Deleted');
  //       localStorage.clear();
  //       this.router.navigate(['welcome']);
    

  //   });

  // }


}
