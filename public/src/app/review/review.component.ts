import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(
    private _httpService : HttpService,
    private _router : Router,
    private _route : ActivatedRoute
  ) { }
  newReview;
  reviewMovie;
  errors = [];
  ngOnInit() {
    this.newReview = {
      review:'',
      rating:'',
      name:'',
    }
    this._route.params.subscribe((params:Params) => {
      this.reviewOneMovie(params['id']);
    })
  }
  reviewOneMovie(id){
    let obs = this._httpService.getOneMovie(id);
    obs.subscribe(data => {
      if(data['errors']){
        console.log('Running Errors', data['errors']);
        for(var key in data['errors']){
          this.errors.push(data['errors'][key]['message']);
        }
      }
      else{
        console.log('Running Results', data['results']);
        this.reviewMovie = data['results'];
      }
    })
  }
  reviewOnMovie(id){
    let obs = this._httpService.reviewOnMovie(id, this.newReview);
    obs.subscribe(data => {
      if(data['errors']){
        console.log('Running Errors', data['errors']);
        for(var key in data['errors']){
          this.errors.push(data['errors'][key]['message']);
        }
      }
      else{
        console.log('Running Results', this.newReview);
        this._router.navigate([`/movies/${id}`]);
      }
    })
  }
}
