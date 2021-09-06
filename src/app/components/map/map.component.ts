import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';
import { NgModule } from '@angular/core';


const iconRetinaUrl = 'https://i.imgur.com/QEQlha3.png';
const iconUrl = 'https://i.imgur.com/QEQlha3.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28]
});
L.Marker.prototype.options.icon = iconDefault;



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;
  private markers;

  title:string;
  address: string;
  lat:any;
  lon:any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 53.7667239, 20.477781292210345 ],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
  
    tiles.addTo(this.map);
  }



  constructor(private http: HttpClient, private service: SharedService) { }

  makeCapitalMarkers(map: L.Map): void {
    this.service.getMarkers().subscribe((res: any) => {
      for (const c of res) {
        const lon = c.lon;
        const lat = c.lat;
        const marker = L.marker([lat, lon]);
        marker.bindTooltip(c.title, {permanent: true, direction:"bottom", opacity:0.8, className: "my-labels"})      
        marker.addTo(map);
      }
    });
  }

  addNewMarker(): void {
    if(this.title != null && this.address != null)
    {
      this.service.getCoord(this.address).subscribe(data =>{
        let val = {
          title: this.title,
          lat: data[0].lat,
          lon: data[0].lon
        }
        this.service.newMarker(val).subscribe(res => {
          const marker = L.marker([ data[0].lat, data[0].lon]);
          marker.bindTooltip(this.title, {permanent: true, direction:"bottom", opacity:0.8, className: "my-labels"}) 
          marker.addTo(this.map);
          this.title = "";
          this.address = "";
        }, err => {
          alert("Coś poszło nie tak");
        });
  
      })
    }
    else{alert("Proszę wypełnić oba pola");}
    
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.makeCapitalMarkers(this.map);
  }

  ngOnInit(): void {
  }

  
}
