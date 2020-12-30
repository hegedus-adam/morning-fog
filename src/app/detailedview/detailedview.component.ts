import { Component, Input, OnInit } from '@angular/core';
import { DetailedWeatherService } from '../services/detailed-weather-data.service';
import { Location } from '../interfaces/location';

@Component({
  selector: 'app-detailedview',
  //template: '<h1> Hello world </h1>',
  templateUrl: './detailedview.component.html',
  styleUrls: ['./detailedview.component.scss']
})
export class DetailedviewComponent implements OnInit {
  private _details: number;
  detailedWeather:object = {};
  detailedWeatherDataArray: Location[] = [];
  locationIDs = [3054638, 721472, 715429, 4119617];
  doRender:boolean;

  @Input() 
  get details() {
    return this._details
  }
  set details(value: number) {
    this._details = value;
    this.onIDChange(value);
  }
  

  constructor( private detailedWeatherData: DetailedWeatherService ) { }

  ngOnInit(): void {
    this.detailedWeatherDataArray = this.detailedWeatherData.getWeatherDetails(this.locationIDs);
    this.doRender = false;
  }

  onIDChange(weatherDataID: number){

    if(this.locationIDs.includes(weatherDataID)){
      let showDetailOf = this.detailedWeatherDataArray.filter(location => location.id === weatherDataID)
      let details = showDetailOf[0];
      this.detailedWeather = details;
      this.doRender = true;
    }
  }

  closeDetails(){
    this.doRender = false;
  }
}
