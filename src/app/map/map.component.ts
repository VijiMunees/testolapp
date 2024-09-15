import { Component, OnInit, OnDestroy } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromEvent, Subscription } from 'rxjs';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})


export class MapComponent implements OnInit, OnDestroy {
  private map!: Map;
  private mapContainer!: HTMLElement;
  private resizeSubscription!: Subscription;

  ngOnInit(): void {
    this.resizeSubscription = fromEvent(window, 'resize').subscribe(() => {
      this.map.updateSize();
    });
    this.initializeMap();
  }

  private initializeMap(): void {
    this.mapContainer = document.getElementById('map') as HTMLElement;

    this.map = new Map({
      target: this.mapContainer,
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0], // Coordinate in EPSG:3857 (Web Mercator)
        zoom: 2
      })
    });
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}