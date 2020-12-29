import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DetailedWeatherService} from './services/detailed-weather-data.service';
import { AboutpageComponent } from './components/aboutpage/aboutpage.component';
import { NavigationComponent } from './components/navigation/navigation.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AboutpageComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DetailedWeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
