import { Injectable } from '@angular/core';
import { Location } from '../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  weatherData: Location;
  weatherDataArray: Location[] = [];
  importData;

  constructor() { }

  getWeatherData(locationIDs): Location[] {
    fetch(`https://api.openweathermap.org/data/2.5/group?id=${locationIDs}&appid=ab43f925584c3f13153382ccb869175d`)
      .then(response => response.json())
      .then(data => {
        this.setWeatherData(data);
      });

    return this.weatherDataArray;
  }

  setWeatherData(dataArray: { list: Location[] }) {
    dataArray.list.forEach((data: Location) => {
      const weatherData = data;
      const sunsetTime = new Date(weatherData.sys.sunset * 1000);
      const currentDate = new Date();

      weatherData.sunset_time = sunsetTime.toLocaleString();
      weatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
      weatherData.temp_celsius = (weatherData.main.temp - 273.15).toFixed(0);
      weatherData.temp_min = (weatherData.main.temp_min - 273.15).toFixed(0);
      weatherData.temp_max = (weatherData.main.temp_max - 273.15).toFixed(0);
      weatherData.temp_feels_like = (weatherData.main.feels_like - 273.15).toFixed(0);

      this.weatherDataArray.push(weatherData);
    });
  }
}
