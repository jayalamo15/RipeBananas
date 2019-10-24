import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(
    private _httpService : HttpService,
    private _router : Router,
    private _route : ActivatedRoute
  ) { }
  newMovie;
  newReview;
  reviewMovie;
  isValid = true;
  errors = [];
  ngOnInit() {
    this.newMovie = {
      title:''
    },
    this.newReview = {
      review:'',
      rating:'',
      name:'',
    }
  }

  createNewMovie(){
    this.errors = [];
    console.log('Running createNewMovie');
    let obs = this._httpService.createNewMovie(this.newMovie);
    console.log(this.newMovie, this.newReview);
    obs.subscribe(data => {
      console.log(data);
      console.log('Running createNewMovie Obs');
      if(data['errors']){
        console.log('Running Errors', data['errors']);
        for(var key in data['errors']){
          this.errors.push(data['errors'][key]['message']);
        }
      }
      else{
        console.log("******THE MOVIE TITLE WAS CREATED!!!!");
        this.reviewMovie = data['results']['_id'];
        console.log("******THIS IS THE MOVIE ID!!!!!",this.reviewMovie);
        this.reviewOneMovie(this.reviewMovie);
      }
    })
  }

  reviewOneMovie(id){
    this.errors = [];
    let obs = this._httpService.getOneMovie(id);
    obs.subscribe(data => {
      if(data['errors']){
        console.log('Running Errors', data['errors']);
        for(var key in data['errors']){
          this.errors.push(data['errors'][key]['message']);
        }
      }
      else{
        console.log('******THIS IS THE GET MOVIE RESULT!!!', data['results']);
        this.reviewOnMovie(this.reviewMovie);
      }
    })
  }

  reviewOnMovie(id){
    this.errors = [];
    let obs = this._httpService.reviewOnMovie(id, this.newReview);
    obs.subscribe(data => {
      if(data['errors']){
        console.log('Running Errors', data['errors']);
        for(var key in data['errors']){
          this.errors.push(data['errors'][key]['message']);
        }
        this.isValid = false;
        this.validReview();
      }
      else{
        console.log('Running Results', this.newReview);
        this._router.navigate(['/movies']);
        this.isValid = true;
        this.validReview();
      }
    })
  }

  validReview(){
    if(this.isValid == false){
      this.deleteOneMovie(this.reviewMovie);
    }
    else{
      console.log("valid movie and review!");
    }
  }

  deleteOneMovie(id){
    console.log('trying to delete')
    let obs = this._httpService.deleteOneMovie(id);
    obs.subscribe(data => {
      if(data['errors']){
        console.log('Running Errors', data['errors']);
      }
      else{
        console.log('Deleted Movie!');
        this._router.navigate(['/movies/new']);
      }
    })
  }
}
