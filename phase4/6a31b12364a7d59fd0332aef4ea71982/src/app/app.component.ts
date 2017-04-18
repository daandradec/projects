
import { Component } from '@angular/core';

export class Place{
  id: number;
  name: string;
  rent: number;
  reputation: number;
}

const PLACES: Place[] = [
  {id: 1, name: "God's house", rent: 230, reputation: 5 },
  {id: 12, name: 'Mels house', rent: 430, reputation: 4 },
  {id: 13, name: 'Lees house', rent: 560, reputation: 3 },
  {id: 14, name: 'Manuels dormitory', rent: 230, reputation:2 },
  {id: 15, name: 'Girls house', rent: 120, reputation: 1 },
  {id: 16, name: 'Google house', rent: 120, reputation: 3 },
  {id: 17, name: 'Spicy house', rent: 330, reputation: 2 },
  {id: 18, name: 'Fancy house', rent: 440, reputation: 4 },
  {id: 19, name: 'Church house', rent: 550, reputation: 3 },
  {id: 20, name: 'Rich house', rent: 990, reputation: 4 }
];




@Component({
  selector: 'my-app',
  template: `

    <h1>{{title}}</h1>
    <!--<google-map [center]="{lat: -34.397, lng: 150.644}" style="width: 100%; height: 100%">
    <google-map-marker [position]="{lat: -34.397, lng: 150.644}"></google-map-marker>
    </google-map>
-->
    <!--
    <sebm-google-map [latitude]="lat" [longitude]="lng">
    <sebm-google-map-marker [latitude]="lat" [longitude]="lng"></sebm-google-map-marker>
    </sebm-google-map>
-->

    <h2>Economic Places </h2>
    <ul class="places">
    <li *ngFor="let place of places" (click) = "onSelect(place)">
      <span class="badge">{{place.id}}</span> {{place.name}}
    </li>



    <div *ngIf = "selectedPlace">
      <h2>{{selectedPlace.name}} Details!</h2>
      <div><label>id:</label>{{selectedPlace.id}}</div>
      <div>
        <label>name:</label>
        <input [(ngModel)] = "selectedPlace.name" placeholdes = "name" />
      </div>
    </div>

  `,
  styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .places {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .places li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .places li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .places li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .places .text {
    position: relative;
    top: -3px;
  }
  .places .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }

  .sebm-google-map-container {
    height: 300px;
  }
`]



})

export class AppComponent {
  title = 'Places for students!';

  places = PLACES;

  selectedPlace : Place;
  onSelect(place: Place): void{
    this.selectedPlace = place;
  }
  lat: number = 41.8708;
  lng: number = 87.6505;
}
