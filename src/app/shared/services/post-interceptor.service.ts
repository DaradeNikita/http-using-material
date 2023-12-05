import { LoaderService } from './loader.service';
import { Observable, delay, finalize, Subject, takeUntil } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PostInterceptorService implements HttpInterceptor{
 unSubscribeAll$ : Subject<void> = new Subject<void>()
  constructor(
    private _LoaderService : LoaderService
  ) { }
  intercept(req : HttpRequest<any>, next : HttpHandler) :Observable<HttpEvent<any>> {
   this._LoaderService.loadingState$.next(true)
    return next.handle(req)
    .pipe(
      delay(1500),
      takeUntil(this.unSubscribeAll$),
      finalize(() =>{
        this._LoaderService.loadingState$.next(false)
      })
    )
   }

   unSubscribeAll(){
    this.unSubscribeAll$.next()
    this.unSubscribeAll$.complete()
   }
}
