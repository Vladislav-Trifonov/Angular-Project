import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { isLoggedGuard } from './core/guards/is-logged.guard';
import { isGuestGuard } from './core/guards/is-guest.guard';

import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/episodes/search/search.component';
import { CatalogComponent } from './features/episodes/catalog/catalog.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CreateComponent } from './features/episodes/create/create.component';
import { DetailsComponent } from './features/episodes/details/details.component';
import { EditComponent } from './features/episodes/edit/edit.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotFoundComponent } from './features/not-found/not-found.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'episodes', component: CatalogComponent },
  { path: 'login', canActivate: [isGuestGuard], component: LoginComponent },
  { path: 'register', canActivate: [isGuestGuard] , component: RegisterComponent },
  { path: 'create', canActivate: [isLoggedGuard], component: CreateComponent },
  { path: 'episodes/details/:episodeId', component: DetailsComponent },
  { path: 'episodes/edit/:episodeId', canActivate: [isLoggedGuard], component: EditComponent },
  { path: 'profile', canActivate: [isLoggedGuard], component: ProfileComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
