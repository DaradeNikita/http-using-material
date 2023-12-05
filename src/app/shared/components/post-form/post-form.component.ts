import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostsService } from '../../services/posts.service';
import { Iposts } from '../../models/posts';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
postForm !: FormGroup;
isInEditMode : boolean =  false;
 getPost !: Iposts

  constructor(
   @Inject (MAT_DIALOG_DATA) editPost : any,
  private _dialogRef : MatDialogRef<PostFormComponent>,
  private _postsService : PostsService)
  {
    this.createPostForm();
    console.log(editPost);
   if(editPost){
    this.getPost = editPost
    this.isInEditMode = true;
    this.postForm.patchValue(editPost)
   }

   }

  ngOnInit(): void {

  }
  createPostForm (){
    this.postForm = new FormGroup({
      body : new FormControl(null,[Validators.required]),
      title : new FormControl(null,[Validators.required]),
      userId : new FormControl(null,[Validators.required])
    })
  }

  onFormSubmit(){
   if(this.postForm.valid){
    let obj = this.postForm.value
    console.log(obj);
    this._postsService.createNewPost(obj)
    .subscribe(res =>{
      console.log(res);
     this._postsService.sendNewPost({...obj, id : res.name})
      this.postForm.reset()
    this._dialogRef.close()
    })
    }
}

onPostUpdate(){
 let updateObj = ({...this.postForm.value,id :this.getPost.id})
 this._postsService.updatePost(updateObj)
 .subscribe((res:any) =>{
  console.log(res);
  this._postsService.sendUpdatedPost(res)
  this.postForm.reset()
  this._dialogRef.close()
 })
}
}
