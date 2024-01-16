import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

import { ContactComponent } from './components/contact/contact.component';
import { ResumeComponent } from './components/resume/resume.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ResumeComponent,
    PageNotFoundComponent,
    ProjectsComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
