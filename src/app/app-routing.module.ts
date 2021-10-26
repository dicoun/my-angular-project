import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from 'src/app/components/home/home.component';
import { LoginComponent }   from 'src/app/components/login/login.component';
import { ProfileComponent }   from 'src/app/components/profile/profile.component';

import { HomeGuard }   from './guards/home.guard';
import { ProfileGuard }   from './guards/profile.guard';

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [HomeGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
