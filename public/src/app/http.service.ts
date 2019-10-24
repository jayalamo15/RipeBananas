import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http : HttpClient) { }
  getAllMovies(){
    return this._http.get('/movies');
  }
  getOneMovie(id){
    return this._http.get(`/movies/${id}`);
  }
  createNewMovie(newMovie){
    return this._http.post('/movies/new', newMovie);
  }
  reviewOnMovie(id,newReview){
    return this._http.post(`/movies/review/${id}`, newReview);
  }
  deleteOneMovie(id){
    return this._http.delete(`/movies/destroy/${id}`);
  }

}
