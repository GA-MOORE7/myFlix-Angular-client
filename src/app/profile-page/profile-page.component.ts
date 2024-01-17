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
  constructor(public fetchApiData: FetchApiDataService,
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
    this.user = this.fetchApiData.getOneUser();

    // this.fetchApiData.getAllMovies().subscribe((response) => {
    //   this.favouriteMovies = response.filter((movie: any) => this.user.favourite_movies.includes(movie._id));
    // });

  }
/**
 * this will redirect to the home page
 */
  public back(): void {
    this.router.navigate(['movies']);
  }
  
  public updateUser(): void {
    // Used registartionComponent with another shared variables
    this.dialog.open(UserRegistrationFormComponent, { width: '400px', height: '400px', data: { title: 'UPDATE USER', button: 'Update', function: 'updateUser()' } });
    this.fetchApiData.currentUser.subscribe(userData => this.user = userData);
  }

  deleteUser(): void {
    if(confirm('Do you want to delete your account permanently?')) {
      this.router.navigate(['welcome']).then(() => {
        localStorage.clear();
        this.snackBar.open('Your account has been deleted', 'OK', {
          duration: 3000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
      });
    }
  }
 
}


