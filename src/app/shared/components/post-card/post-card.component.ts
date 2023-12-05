import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Iposts } from '../../models/posts';
import { MatDialog } from '@angular/material/dialog';
import { PostsService } from '../../services/posts.service';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() postObj !: Iposts;
  @Output() emitPost : EventEmitter<Iposts> = new EventEmitter<Iposts>();
  @Output() emitPostId : EventEmitter<string> = new EventEmitter<string>();
  constructor(private _matDialog : MatDialog,
    private _postsService : PostsService)
    {}

  ngOnInit(): void {
  }
  onEditPost(){
 this.emitPost.emit(this.postObj)
  }

  onPostRemove(){
const dialogConfig = this._matDialog.open(GetConfirmComponent)
dialogConfig.afterClosed()
.subscribe((getConfirm : boolean) =>{
  console.log(getConfirm);
  if(getConfirm){
  this._postsService.removePost(this.postObj.id)
  .subscribe(res => {
    console.log(res);
    this.emitPostId.emit(this.postObj.id)

  })
  }else{
 return
  }

})
  }
}
