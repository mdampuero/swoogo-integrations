// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	baseBEUrl: 'http://localhost:8080',
	mapBox: {
		apiKey: 'pk.eyJ1IjoibWRhbXB1ZXJvIiwiYSI6ImNsaDlwaW1tdDA5cW0zcnRkYWJxNW00NmMifQ.-UjTToqIopVTq7plocSHhQ',
		defaultLng: -70.64827, 
		defaultLat: -33.45694,
		defaultZoom: 9
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
