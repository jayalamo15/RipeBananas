import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    private _httpService : HttpService,
    private _router : Router,
    private _route : ActivatedRoute
  ) { }
  removeMovie;
  ngOnInit() {
    this._route.params.subscribe((params:Params) => { this.deleteOneMovie(params['id']);
    })
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
        this._router.navigate(['/movies']);
      }
    })
  }
}
