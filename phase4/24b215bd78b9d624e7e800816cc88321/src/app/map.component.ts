import { Component } from '@angular/core';
 
@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['map.component.css']
})
export class MapComponent {
    x: number = 41.8708;
    y: number = -87.6505;
    zoom: number = 12;
    scrollmap: boolean = false;
    
    univicon: string = "http://business.uic.edu/sites/all/themes/uiccba/images/favicon/favicon-32px.png";
}