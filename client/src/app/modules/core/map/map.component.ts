import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';

declare let L;

const DEFAULT_LATITUDE = 48.11955846054492;
const DEFAULT_LONGITUDE = 17.100353462836438;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [
    './map.component.scss'
  ],
})
export class MapComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() edit: boolean;
  @Output() latitudeChange: EventEmitter<string> = new EventEmitter();
  @Output() longitudeChange: EventEmitter<string> = new EventEmitter();

  map: any;
  mapPopUp: any;

  constructor() {
  }

  ngOnInit(): void {
    const self = this;
    this.latitude = this.latitude || DEFAULT_LATITUDE;
    this.longitude = this.longitude || DEFAULT_LONGITUDE;
    this.map = L.map('map').setView([this.latitude, this.longitude], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.map.on('click', function(e) { self.handleClickEvent(e); });
  }

  ngOnChanges(): void {
    if (this.latitude && this.longitude) {
      this.map.setView([this.latitude, this.longitude], 12);
      this.createMarker();
    }
  }

  handleClickEvent(e) {
    const self = this;
    if (this.edit && e && e.originalEvent) {
      const location = this.map.mouseEventToLatLng(e.originalEvent);
      this.latitudeChange.emit(location.lat);
      this.longitudeChange.emit(location.lng);
      this.createMarker();
    }
  }

  createMarker() {
    this.mapPopUp = L.popup({closeButton: false, closeOnClick: false})
      .setLatLng([this.latitude, this.longitude])
      .setContent(this.title)
      .openOn(this.map);
  }

  removeMarker() {
    if (this.edit) {
      this.latitude = undefined;
      this.longitude = undefined;
      this.latitudeChange.emit(undefined);
      this.longitudeChange.emit(undefined);
      this.mapPopUp._close();
    }
  }

  openGoogleMaps() {
    window.open(`https://www.google.com/maps/search/?api=1&query=${this.latitude},${this.longitude}`, '_blank');
  }

}
