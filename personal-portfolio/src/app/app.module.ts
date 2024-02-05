import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

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

import { ExperienceComponent } from './components/experience/experience.component';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { FooterComponent } from './components/footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';

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
    ForgotPasswordComponent,
    VerifyEmailComponent,
    FooterComponent,
    ExperienceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot({}),
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
