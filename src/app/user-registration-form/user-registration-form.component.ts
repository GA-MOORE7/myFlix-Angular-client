// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input, Inject } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData : any= { Username: '', Password: '', Email: '', Birth: '' };

  token : any = localStorage.getItem('token');

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, button: string, function: string},
  ) {}

ngOnInit(): void {
  if( this.token !== null ){
    this.userData = JSON.parse(localStorage.getItem('user') || '');
    this.userData.Password = '';
    console.log(this.userData);
  }
  
}

// This is the function responsible for sending the form inputs to the backend
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     console.log(response);
     this.snackBar.open('user registered successfully', 'OK', {
        duration: 2000
     });
    }, (response) => {
      console.log(response)
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((response) => {
      console.log(response);
     localStorage.setItem('user', JSON.stringify(response));
     this.dialogRef.close();
     this.snackBar.open('User updated successfully!!', 'OK', {duration: 2000});
    //  this.userData = JSON.parse(localStorage.getItem('user') || '');
    //  this.userData.Password = '';
    //  console.log(this.userData);
    }, (response) => {
     console.log(response);
     this.snackBar.open(response, 'OK', {  duration: 2000});
    });
 }


  }
