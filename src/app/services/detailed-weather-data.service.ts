import { Injectable } from '@angular/core';
import { coordinates } from '../interfaces/coordinates';
import { Location } from '../interfaces/location';

@Injectable({
    providedIn: 'root'
})
export class DetailedWeatherService {
    detailedWeatherData: Location;
    forecastDataInformation = [];

    async getForecastDetails(coordinates: coordinates) {
        const api_key: string = 'ab43f925584c3f13153382ccb869175d';
        const part = '';
        this.forecastDataInformation = [];

        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude=${part}&appid=${api_key}`)
        const data = await response.json();
        return data;
    }

    setDetailedWeatherData(dataArray) {
        this.forecastDataInformation.push(dataArray);
    }
}