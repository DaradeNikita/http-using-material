import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDashBoardComponent } from './shared/components/post-dash-board/post-dash-board.component';

const routes: Routes = [
  {
    path : "",
    component :PostDashBoardComponent
  },
  {
  path : "posts",
  component : PostDashBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
