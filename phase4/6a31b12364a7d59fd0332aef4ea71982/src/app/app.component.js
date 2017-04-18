"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Place = (function () {
    function Place() {
    }
    return Place;
}());
exports.Place = Place;
var PLACES = [
    { id: 1, name: "God's house", rent: 230, reputation: 5 },
    { id: 12, name: 'Mels house', rent: 430, reputation: 4 },
    { id: 13, name: 'Lees house', rent: 560, reputation: 3 },
    { id: 14, name: 'Manuels dormitory', rent: 230, reputation: 2 },
    { id: 15, name: 'Girls house', rent: 120, reputation: 1 },
    { id: 16, name: 'Google house', rent: 120, reputation: 3 },
    { id: 17, name: 'Spicy house', rent: 330, reputation: 2 },
    { id: 18, name: 'Fancy house', rent: 440, reputation: 4 },
    { id: 19, name: 'Church house', rent: 550, reputation: 3 },
    { id: 20, name: 'Rich house', rent: 990, reputation: 4 }
];
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Places for students!';
        this.places = PLACES;
        this.lat = 41.8708;
        this.lng = 87.6505;
    }
    AppComponent.prototype.onSelect = function (place) {
        this.selectedPlace = place;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n\n    <h1>{{title}}</h1>\n    <!--<google-map [center]=\"{lat: -34.397, lng: 150.644}\" style=\"width: 100%; height: 100%\">\n    <google-map-marker [position]=\"{lat: -34.397, lng: 150.644}\"></google-map-marker>\n    </google-map>\n-->\n    <!--\n    <sebm-google-map [latitude]=\"lat\" [longitude]=\"lng\">\n    <sebm-google-map-marker [latitude]=\"lat\" [longitude]=\"lng\"></sebm-google-map-marker>\n    </sebm-google-map>\n-->\n\n    <h2>Economic Places </h2>\n    <ul class=\"places\">\n    <li *ngFor=\"let place of places\" (click) = \"onSelect(place)\">\n      <span class=\"badge\">{{place.id}}</span> {{place.name}}\n    </li>\n\n\n\n    <div *ngIf = \"selectedPlace\">\n      <h2>{{selectedPlace.name}} Details!</h2>\n      <div><label>id:</label>{{selectedPlace.id}}</div>\n      <div>\n        <label>name:</label>\n        <input [(ngModel)] = \"selectedPlace.name\" placeholdes = \"name\" />\n      </div>\n    </div>\n\n  ",
        styles: ["\n  .selected {\n    background-color: #CFD8DC !important;\n    color: white;\n  }\n  .places {\n    margin: 0 0 2em 0;\n    list-style-type: none;\n    padding: 0;\n    width: 15em;\n  }\n  .places li {\n    cursor: pointer;\n    position: relative;\n    left: 0;\n    background-color: #EEE;\n    margin: .5em;\n    padding: .3em 0;\n    height: 1.6em;\n    border-radius: 4px;\n  }\n  .places li.selected:hover {\n    background-color: #BBD8DC !important;\n    color: white;\n  }\n  .places li:hover {\n    color: #607D8B;\n    background-color: #DDD;\n    left: .1em;\n  }\n  .places .text {\n    position: relative;\n    top: -3px;\n  }\n  .places .badge {\n    display: inline-block;\n    font-size: small;\n    color: white;\n    padding: 0.8em 0.7em 0 0.7em;\n    background-color: #607D8B;\n    line-height: 1em;\n    position: relative;\n    left: -1px;\n    top: -4px;\n    height: 1.8em;\n    margin-right: .8em;\n    border-radius: 4px 0 0 4px;\n  }\n\n  .sebm-google-map-container {\n    height: 300px;\n  }\n"]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map