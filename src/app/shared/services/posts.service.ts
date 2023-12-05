import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iposts } from '../models/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
 postUrl : string = `${environment.baseUrl}/post.json`

 private newPostSub$ :Subject<Iposts> = new Subject<Iposts>()
 newPostSubObs$ :Observable<Iposts> = this.newPostSub$.asObservable();

 private updatePostSub$ : Subject<Iposts> = new Subject<Iposts>()
 updatePostSubObs$ : Observable<Iposts> = this.updatePostSub$.asObservable()

 constructor(private _http : HttpClient) { }

  getAllPost():Observable<any>{
    return this._http.get(this.postUrl)
            .pipe(
              map((res : any) =>{
                let postsArray : Array<Iposts>= [];
               for (const key in res) {
               postsArray.push({...res[key], id : key})
               };
               return postsArray
              })
            )
              }


createNewPost(post : Iposts):Observable<any>{
return this._http.post<any>(this.postUrl,post)
      .pipe(
      catchError(err =>{
 alert('something went wrong')
 return of(err)
      })
      )
}
sendNewPost(post : Iposts){
  this.newPostSub$.next(post)
}

sendUpdatedPost(post : Iposts){
  this.updatePostSub$.next(post)
}

updatePost(post : Iposts){
  let updateUrl = `${environment.baseUrl}/post/${post.id}.json`
  return this._http.patch(updateUrl,post)
}
removePost(postId : string){
  let updateUrl = `${environment.baseUrl}/post/${postId}.json`
  return this._http.delete(updateUrl)
}

}
