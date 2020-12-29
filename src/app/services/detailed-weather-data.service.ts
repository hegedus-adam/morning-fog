import { Injectable } from '@angular/core';
import { Location } from '../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class DetailedWeatherService {
    detailedWeatherData: Location;
    detailedWeatherDataArray: Location[] = [];

    getWeatherDetails(locationID) {
        console.log('getting data');
        this.detailedWeatherDataArray = []
        fetch(`https://api.openweathermap.org/data/2.5/group?id=${locationID}&appid=ab43f925584c3f13153382ccb869175d`)
            .then(response => response.json())
            .then(data => { this.setDetailedWeatherData(data); })

        return this.detailedWeatherDataArray;
    }

    setDetailedWeatherData(dataArray) {
        dataArray.list.forEach((data: Location) => {
            const weatherData = data;
            let sunsetTime = new Date(weatherData.sys.sunset * 1000);
            weatherData.sunset_time = sunsetTime.toLocaleString();
            let currentDate = new Date();
            weatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
            weatherData.temp_celsius = (weatherData.main.temp - 273.15).toFixed(0);
            weatherData.temp_min = (weatherData.main.temp_min - 273.15).toFixed(0);
            weatherData.temp_max = (weatherData.main.temp_max - 273.15).toFixed(0);
            weatherData.temp_feels_like = (weatherData.main.feels_like - 273.15).toFixed(0);

            this.detailedWeatherDataArray.push(weatherData);
        });
    }
}