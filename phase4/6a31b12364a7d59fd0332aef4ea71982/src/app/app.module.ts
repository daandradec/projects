import { NgModule, ApplicationRef }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { AppComponent }  from './app.component';
import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-map/core';


//import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
  /*  AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDH3p_O_DuFrOZoji0ocy4TakYNSRF6fH8'
    })*/
  ],

  providers : [],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
