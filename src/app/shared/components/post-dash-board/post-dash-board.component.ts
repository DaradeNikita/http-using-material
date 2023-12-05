import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Iposts } from '../../models/posts';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-post-dash-board',
  templateUrl: './post-dash-board.component.html',
  styleUrls: ['./post-dash-board.component.scss']
})
export class PostDashBoardComponent implements OnInit {
  postsArr : Array<Iposts> = [];
  constructor(private _postsService : PostsService,
   private _matDialog : MatDialog ) { }

  ngOnInit(): void {
    this._postsService.getAllPost()
    .subscribe(res =>{
      console.log(res);
      this.postsArr = res
    })
    this._postsService.newPostSubObs$
    .subscribe((post : Iposts) =>{
      this.postsArr.push(post)
    })

    this._postsService.updatePostSubObs$
    .subscribe((updatedPost : Iposts) =>{
      let getIndex = this.postsArr.findIndex(post =>{
      return post.id === updatedPost.id
      })
      this.postsArr[getIndex] = updatedPost
    })
  }

  onPostAdd(){
   const dialogConf = new MatDialogConfig()
  dialogConf.disableClose = true;
  dialogConf.width = "400px";
  const dialogRef = this._matDialog.open(PostFormComponent,dialogConf)
  }

patchEditValue(editPost :Iposts){
console.log(editPost);
const dialogConf = new MatDialogConfig()
dialogConf.disableClose = true;
dialogConf.width = "400px";
dialogConf.data = editPost;
const dialogRef = this._matDialog.open(PostFormComponent,dialogConf)
}

removePost(id : string){
let getIndex = this.postsArr.findIndex(post =>post.id === id);
this.postsArr.splice(getIndex,1)
}
}
