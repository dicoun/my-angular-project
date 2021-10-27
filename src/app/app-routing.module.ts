import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from 'src/app/components/home/home.component';
import { LoginComponent }   from 'src/app/components/login/login.component';
import { ProfileComponent }   from 'src/app/components/profile/profile.component';

import { LoginGuard }   from './guards/login.guard';

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard]},
    { path: '', component: HomeComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
