import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent }   from 'src/app/components/home/home.component';
import { LoginComponent }   from 'src/app/components/login/login.component';
import { ProfileComponent }   from 'src/app/components/profile/profile.component';
import { HeaderComponent }   from 'src/app/components/header/header.component';

import { LoginGuard }   from './guards/login.guard';
import { ReqInterceptor} from './services/interceptor.service';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LoginGuard, StorageService,
                {
                  provide: HTTP_INTERCEPTORS,
                  useClass: ReqInterceptor,
                  multi: true,
             }],
  bootstrap: [AppComponent]
})
export class AppModule { }
