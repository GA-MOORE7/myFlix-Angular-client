// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

/**
 * @description Component representing the movie card.
 * @selector 'app-movie-card'
 * @templateUrl './movie-card.component.html'
 * @styleUrls ['./movie-card.component.scss']
 */

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  /** The movie data displayed in the card. */
  movies: any[] = [];
  favorites: any[] = [];


  user = JSON.parse(localStorage.getItem('user') || '');

  /**
    * @constructor
    * @param {FetchApiDataService} fetchApiData - Service for handling shared data between components.
    * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
    * @param {MatSnackBar} snackBar - Angular Material's MatSnackBar service for notifications.  
    * @param {Router} router - Angular's Router service for navigation.
    */

  constructor(public fetchApiData: FetchApiDataService,
              public router: Router,
              public dialog: MatDialog,
              public snackBar: MatSnackBar
    ) { }

ngOnInit(): void {
  this.getAllMovies();
}

  /**
 * This will get all movies from the API
 * @returns movies
 */

getAllMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

 /** 
   * Get user info and set favorites
   * @returns favorite movies selected by user
   * */

  getFavorites(): void {
    this.fetchApiData.getOneUser().subscribe(
      (resp: any) => {
        if (resp.user && resp.user.FavoriteMovies) {
          this.favorites = resp.user.FavoriteMovies;
        } else {
          this.favorites = []; // Set an empty array if data is not available
        }
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
        this.favorites = []; // Set an empty array on error as well
      }
    );
  }

 /**
    * Check if a movie is a user's favorite already
    * @param movieID
    * @returns boolean
    * */

  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;
  }

  /**
   * Add a movie to a user's favorites 
   * Or remove on click if it is already a favorite
   * @param id 
   * @returns success message
   * */

  public addToFavorites(id: string): void {
    if (this.isFavoriteMovie(id)) {
      // Movie is already a favorite, so remove it
      this.removeFavoriteMovie(id);
    } else {
      // Movie is not a favorite, so add it
      this.fetchApiData.addFavoriteMovies(id).subscribe(() => {
        this.snackBar.open('Movie added to favorites', 'OK', {
          duration: 2000,
        });
        this.getFavorites();
      });
    }
  }

  /**
 * This will remove movie from user's favorite list
 * @param id 
 * @returns suceess message
 */

  public removeFavoriteMovie(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('removed from favorites', 'OK', {
        duration: 2000
      })
    });
  }

   /** 
   *  Open genre information from GenreComponent 
   * @param genre 
   * @returns genres name and details
   * */

  public getGenre(genre: any){
    this.dialog.open(GenreComponent, { width: '400px', height: '300px', data: {genre: genre}});
  }

  /** 
 * Open director information from DirectorComponent
 * @param director
 * @returns director name, bio, birth
 * */

  public getOneDirector(director: any){
    this.dialog.open(DirectorComponent, { width: '400px', height: '300px', data: {director: director}});
  }  

  /** Open movie description from MovieDetailsComponent
 * @param details
 * @returns movie Title, Description
 * */

  public openMovieDetails(details: string){
    this.dialog.open(MovieDetailsComponent, { width: '400px', height: '300px', data: {details: details}});
  }

}
