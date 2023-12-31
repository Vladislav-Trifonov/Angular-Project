import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/features.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { RequestIntercepor } from './core/interceptors/request.interceptor';


@NgModule({
  declarations: [AppComponent, ],
  imports: [
    BrowserModule,
    SharedModule,
    FeaturesModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestIntercepor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
