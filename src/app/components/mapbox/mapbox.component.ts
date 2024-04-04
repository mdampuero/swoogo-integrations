import { Component, Input } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { EventsService } from 'src/app/services/events.service';
import { environment } from "src/environments/environment";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
@Component({
	selector: 'app-mapbox',
	templateUrl: './mapbox.component.html',
	styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent {
	@Input() inputLat: any;
	@Input() inputLng: any;
	@Input() inputZoom: any;

	public lat = 0;
	public lng = 0;
	public zoom = 0;

	public map: any;
	public marker: any;

	constructor(public events: EventsService) {
	}

	ngOnInit(): void {

		this.lat = (this.inputLat) ? (this.inputLat) : environment.mapBox.defaultLat;
		this.lng = (this.inputLng) ? (this.inputLng) : environment.mapBox.defaultLng;
		this.zoom = (this.inputZoom) ? (this.inputZoom) : environment.mapBox.defaultZoom;
		// Configurar Mapbox
		mapboxgl.accessToken = environment.mapBox.apiKey;

		// Crear un nuevo mapa
		this.map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [this.lng, this.lat],
			zoom: this.zoom,
			// scrollZoom: false
		});
		this.map.scrollZoom.disable();
		this.map.on('zoomend', () => {
			this.listenerMap();
		});
		// Agregar control de navegación
		this.map.addControl(new mapboxgl.NavigationControl());

		// Agregar control de búsqueda
		const geocoder = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl,
			marker: false
		});

		this.map.on('wheel', (e: { originalEvent: { ctrlKey: any; }; preventDefault: () => void; deltaY: any; detail: any; wheelDelta: any; }) => {
			// Verifica si la tecla Ctrl está presionada
			if (e.originalEvent.ctrlKey) {
			  // Cancela el comportamiento predeterminado de la rueda de desplazamiento
			  e.preventDefault();
			  // Calcula el nivel de zoom en función de la dirección de la rueda de desplazamiento
			  var delta = e.deltaY || e.detail || e.wheelDelta;
			  var zoom = this.map.getZoom();
			  zoom += delta > 0 ? -0.1 : 0.1; // Ajusta la velocidad de zoom según tus preferencias
			  // Limita el nivel de zoom dentro de ciertos límites (opcional)
			  var minZoom = 0;
			  var maxZoom = 20;
			  zoom = Math.min(Math.max(zoom, minZoom), maxZoom);
			  // Aplica el nuevo nivel de zoom al mapa
			  this.map.setZoom(zoom);
			}
		  });

		this.map.addControl(geocoder);

		this.marker = new mapboxgl.Marker({
			draggable: true
		})
			.setLngLat([this.lng, this.lat])
			.addTo(this.map);

		this.marker.on('dragend', () => {
			this.listenerMap();
		});

		geocoder.on('result', (e: { result: { geometry: { coordinates: any; }; }; }) => {
			// Obtener las coordenadas del resultado seleccionado
			const lngLat = e.result.geometry.coordinates;

			// Mover el marcador a las nuevas coordenadas
			this.marker.setLngLat(lngLat);
		});
	}

	listenerMap() {
		const lngLat = this.marker.getLngLat();
		const lng = lngLat.lng;
		const lat = lngLat.lat;
		const zoom = this.map.getZoom();
		this.events.publish('mapbox', {
			lng,
			lat,
			zoom
		});
	}
}
