import { Component, ElementRef, getDebugNode, OnInit, Output, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { WeatherDataService } from '../../services/weather-data.service';
import { Location } from '../../interfaces/location';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  locationIDs = [3054638, 721472, 715429, 4119617];
  weatherDataArray: Location[] = [];
  @ViewChild('details') parent: ElementRef
  coordinatesToPass: object = {};
  selectedCity: string;

  constructor(private weatherDataService: WeatherDataService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.weatherDataArray = this.weatherDataService.getWeatherData(this.locationIDs);
  }

  async getDetails(weatherData, event) {
    this.coordinatesToPass = { longitude: weatherData.coord.lon, latitude: weatherData.coord.lat, city: weatherData.name };
    console.log('STEP I > get details button fired creating new coordinates ' + JSON.stringify(this.coordinatesToPass));
    if (event.target.id) {

      let weather_nodes = document.querySelectorAll('.weather-container');

      weather_nodes.forEach(node => {
        if (document.getElementById(node.id).classList.contains('selected')) {
          document.getElementById(node.id).classList.remove('selected');
        }
      });
      console.log('STEP I.B > City ' + event.target.id + ' is selected');
      document.getElementById(event.target.id).classList.add('selected');
    }

  }

  selectFrame(eventDetails) {
    console.log('STEP IV > Selectable city is ' + eventDetails);
    this.selectedCity = eventDetails;
  }

}
