import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './_directives/alert/alert.component';
import { PreloaderComponent } from './_directives/preloader/preloader.component';
import { ErrorComponent } from './error/error.component';

import { AuthGuardService } from './_guards/auth-guard.service';
import { AlertService } from './_services/alert/alert.service';
import { FirebaseService } from './_services/firebase/firebase.service';
import { FirestoreService } from './_services/firebase/firestore.service';

import { RegisterComponent } from './register/register.component';
import { CaptationComponent } from './captation/captation.component';
import { ClinicComponent } from './clinic/clinic.component';
import { DetailComponent } from './captation/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    PreloaderComponent,
    ErrorComponent,
    RegisterComponent,
    CaptationComponent,
    ClinicComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuardService,
    AlertService,
    FirebaseService,
    FirestoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
