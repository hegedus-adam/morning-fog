import { Component, ElementRef, getDebugNode, OnInit, Renderer2, ViewChild } from '@angular/core';
import { WeatherDataService } from '../../services/weather-data.service';
import { Location } from '../../interfaces/location';
import { DetailedWeatherService } from '../../services/detailed-weather-data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  locationIDs = [3054638, 721472, 715429, 4119617];
  weatherDataArray : Location[] = [];
  detailedWeatherDataArray: Location[] = [];
  @ViewChild('details') parent: ElementRef;

  constructor(private weatherDataService: WeatherDataService, private detailedWeatherData: DetailedWeatherService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.weatherDataArray = this.weatherDataService.getWeatherData(this.locationIDs);
    this.detailedWeatherDataArray = this.detailedWeatherData.getWeatherDetails(this.locationIDs)
  }
  
  async getDetails(weatherDataID){
    //this.detailedWeatherDataArray = [];
    //console.log(`one card is clicked with ${weatherDataID}`);
    //this.detailedWeatherDataArray = this.detailedWeatherData.getWeatherDetails(weatherDataID);

    let showDetailOf = this.detailedWeatherDataArray.filter(location=>location.id === weatherDataID)
    let details = showDetailOf[0];

    const detailedInfoDialog: HTMLDivElement = this.renderer.createElement('div');
    detailedInfoDialog.classList.add('detail-box')
    
    detailedInfoDialog.innerHTML = `
    <div class="card text-white bg-secondary mb-3 detail-card">
      <div class="card-header"><h5 class="card-title">Detailed information about ${details.name}</h5></div>
      <div class="card-body">
        <span class="card-text text-danger" style="font-weight: bolder;">This popup will disappear in 4 seconds</span><br/>
        <hr/>
        <span class="card-text">Sunset time: ${details.sunset_time}</span><br/>
        <span class="card-text">Temperature feels like: ${details.temp_feels_like}°C</span><br/>
        <span class="card-text">Longitude: ${details.coord.lon}°</span><br/>
        <span class="card-text">Latitude: ${details.coord.lat}°</span><br/>
        <span class="card-text">Wind speed: ${details.wind.speed} K/h</span><br/>
        <span class="card-text">Wind angle: ${details.wind.deg}°</span><br/>
        
      </div>
    </div>
    `;
    
    this.renderer.appendChild(this.parent.nativeElement, detailedInfoDialog);

    setTimeout(()=>{
      this.renderer.removeChild(this.parent.nativeElement, detailedInfoDialog);
    }, 4000)

  }

}
