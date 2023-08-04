import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './episodes/catalog/catalog.component';
import { SearchComponent } from './episodes/search/search.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateComponent } from './episodes/create/create.component';
import { DetailsComponent } from './episodes/details/details.component';
import { EditComponent } from './episodes/edit/edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    CatalogComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    CreateComponent,
    DetailsComponent,
    EditComponent,
    NotFoundComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, FormsModule, HttpClientModule],
})
export class FeaturesModule {}
