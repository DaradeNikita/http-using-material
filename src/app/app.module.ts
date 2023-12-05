import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { PostDashBoardComponent } from './shared/components/post-dash-board/post-dash-board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PostCardComponent } from './shared/components/post-card/post-card.component';
import { PostFormComponent } from './shared/components/post-form/post-form.component';
import { GetConfirmComponent } from './shared/components/get-confirm/get-confirm.component';
import { PostInterceptorService } from './shared/services/post-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PostDashBoardComponent,
    PostCardComponent,
    PostFormComponent,
    GetConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : PostInterceptorService,
      multi : true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
