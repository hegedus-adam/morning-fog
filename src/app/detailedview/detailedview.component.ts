import { Component, Input, OnInit } from '@angular/core';
import { DetailedWeatherService } from '../services/detailed-weather-data.service';
import { Location } from '../interfaces/location';
import { coordinates } from '../interfaces/coordinates';
import { forecastPool } from '../interfaces/forecast';

@Component({
  selector: 'app-detailedview',
  //template: '<h1> Hello world </h1>',
  templateUrl: './detailedview.component.html',
  styleUrls: ['./detailedview.component.scss']
})
export class DetailedviewComponent implements OnInit {
  private _coordinates: coordinates;
  detailedWeather: object = {};
  detailedWeatherDataArray: Location[] = [];
  forecastDataInformation = {
    daily: []
  };
  forecast: forecastPool = {
    tomorrow: { temperature: 0, feelsLike: 0, humidity: 0 },
    dayAfter: { temperature: 0, feelsLike: 0, humidity: 0 },
    twoDayAfter: { temperature: 0, feelsLike: 0, humidity: 0 },
  };
  doRender: boolean;


  @Input()
  get details() {
    return this._coordinates
  }
  set details(value: coordinates) {
    this._coordinates = value;
    this.onIDChange(value);
  }

  constructor(private getForecast: DetailedWeatherService) { }

  ngOnInit(): void {
    //this.forecastDataInformation = this.getForecast.getForecastDetails({longitude: 21.63, latitude: 47.53, city: 'Debrecen'});
    this.doRender = false;
  }

  onIDChange(newCoordinates: coordinates) {
    if (newCoordinates.latitude && newCoordinates.longitude) {
      this.getForecast.getForecastDetails(newCoordinates).then(data => {
        this.forecastDataInformation = data;
      })
    }

    console.log(this.forecastDataInformation);

    if (!isEmptyObject(this.forecastDataInformation) && this.forecastDataInformation.daily.length > 3) {
      for (let key in this.forecast) {
        let dayIndex: number = 0;

        switch (key) {
          case 'dayAfter':
            dayIndex = 1;
            break;
          case 'twoDayAfter':
            dayIndex = 2
            break;
          default:
            dayIndex = 0;
            break;
        }

        this.forecast[key] = {
          temperature: (this.forecastDataInformation.daily[dayIndex].temp.day - 273.15).toFixed(0),
          feelsLike: (this.forecastDataInformation.daily[dayIndex].feels_like.day - 273.15).toFixed(0),
          humidity: this.forecastDataInformation.daily[dayIndex].humidity
        }
      }

      this.doRender = true;

    }
  }

  closeDetails() {
    this.doRender = false;
  }
}

const isEmptyObject = (obj: object) => {
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }
}
