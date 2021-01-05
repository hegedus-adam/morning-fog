import { Component, Input, OnInit } from '@angular/core';
import { DetailedWeatherService } from '../services/detailed-weather-data.service';
import { Location } from '../interfaces/location';
import { coordinates } from '../interfaces/coordinates';

@Component({
  selector: 'app-detailedview',
  //template: '<h1> Hello world </h1>',
  templateUrl: './detailedview.component.html',
  styleUrls: ['./detailedview.component.scss']
})
export class DetailedviewComponent implements OnInit {
  private _coordinates: coordinates;
  detailedWeather:object = {};
  detailedWeatherDataArray: Location[] = [];
  forecastDataInformation = [];
  //locationIDs = [3054638, 721472, 715429, 4119617];
  locationCoords = [
    {longitude: 19.08, latitude: 47.5, city: 'Budapest'}, 
    {longitude: 21.63, latitude: 47.53, city: 'Debrecen'}, 
    {longitude: 20.15, latitude: 46.25, city: 'Szeged'}, 
    {longitude: -93.25, latitude: 35.33, city: 'London'}
  ]
  doRender:boolean;

  @Input() 
  get details() {
    return this._coordinates
  }
  set details(value: coordinates) {
    this._coordinates = value;
    this.onIDChange(value);
  }
  

  constructor( private getForecast: DetailedWeatherService ) { }

  ngOnInit(): void {
    //this.forecastDataInformation = this.getForecast.getForecastDetails({longitude: 21.63, latitude: 47.53, city: 'Debrecen'});
    this.doRender = false;
  }

  onIDChange(newCoordinates: coordinates){
    console.log(newCoordinates);
    //this.forecastDataInformation = this.getForecast.getForecastDetails(newCoordinates);
    //console.log(this.getForecast.getForecastDetails({longitude: 21.63, latitude: 47.53, city: 'Debrecen'}))
    if(newCoordinates.latitude && newCoordinates.longitude){
      this.getForecast.getForecastDetails(newCoordinates).then(data=>{
        this.forecastDataInformation = data;
      })
    }

    console.log(this.forecastDataInformation);
    this.doRender = true;
    //console.log(newCoordinates);
    //this.detailedWeatherDataArray = this.getForecast.getForecastDetails(newCoordinates);
    //console.log(this.detailedWeatherDataArray)
    /*
    if(this.locationIDs.includes(weatherDataID)){
      let showDetailOf = this.detailedWeatherDataArray.filter(location => location.id === weatherDataID)
      let details = showDetailOf[0];
      this.detailedWeather = details;
      this.doRender = true;
    }
    */
  }

  closeDetails(){
    this.doRender = false;
  }
}
