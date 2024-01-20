import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

   /**
   * navbar element to navigate home page
   */
  public openMovieList(): void{
    this.router.navigate(['movies']);
  }
  /**
   * navbar element to navigate profile page
   */
  public openProfile(): void {
    this.router.navigate(['profile']);
  }
  /**
   * navbar element to logout the current user and navigate to welcome page
   */
  public logoutUser(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.router.navigate(['welcome']);
  }


}
