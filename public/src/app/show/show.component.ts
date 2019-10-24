import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(
    private _httpService : HttpService,
    private _router : Router,
    private _route : ActivatedRoute
  ) { }
  movie;
  average;
  ngOnInit() {
    this._route.params.subscribe((params:Params) => {
      this.getOneMovie(params['id']);
    })
  }
  getOneMovie(id){
    let obs = this._httpService.getOneMovie(id);
    obs.subscribe(data => {
      console.log(data);
      if(data['results']){
        this.movie = data['results'];
      }
    })
  }
  getAverage(){
    console.log(this.movie.reviews)
    let sum = 0;
    for(var rate of this.movie.reviews){

      sum += rate.rating;
    }
    this.average = Math.round((sum/this.movie.reviews.length)*100)/100; 
  }
}
