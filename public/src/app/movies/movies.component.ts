import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(
    private _httpService : HttpService
  ) { }
  allMovies;
  ngOnInit() {
    this.getMovies();
  }
  getMovies(){
    let obs = this._httpService.getAllMovies();
    obs.subscribe(data => {
      if(data['errors']){
        console.log('Running Errors', data['errors']);
      }
      else{
        this.allMovies = data['results'];
      }
    })
  }
}
