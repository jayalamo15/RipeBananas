import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { MoviesComponent } from './movies/movies.component';
import { NewComponent } from './new/new.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReviewComponent } from './review/review.component';
import { ShowComponent } from './show/show.component';


const routes: Routes = [
  {path:'movies', component: MoviesComponent},
  {path:'movies/review/:id', component: ReviewComponent},
  {path:'movies/new', component: NewComponent},
  {path:'movies/:id', component: ShowComponent},
  {path:'movies/destroy/:id', component: DeleteComponent},
  {path:'', pathMatch:'full', redirectTo:'/movies'},
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
