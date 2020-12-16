import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../../services/weather-data.service';
import { Location } from '../../interfaces/location';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  locationIDs = [3054638, 721472, 715429, 4119617];
  weatherDataArray : Location[] = [];
  constructor(private weatherDataService: WeatherDataService) { }

  ngOnInit(): void {
    this.weatherDataArray = this.weatherDataService.getWeatherData(this.locationIDs);
    console.log(this.weatherDataArray);
  }



}
