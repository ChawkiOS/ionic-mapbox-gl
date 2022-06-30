import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	private mapbox: mapboxgl.Map;

	constructor() {
		mapboxgl.accessToken = environment.mapbox.accessToken;
	}

	ngOnInit() {
		const mediaDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
		mediaDarkMode.addEventListener('change', this.switchMode);

		this.initMap(mediaDarkMode.matches);
	}

	private initMap(isDarkModeEnebled: boolean) {
		this.mapbox = new mapboxgl.Map({
			container: 'mapbox',
			style: `mapbox://styles/mapbox/${
				isDarkModeEnebled ? 'dark' : 'light'
			}-v10`,
			zoom: 12,
			center: [2.343756, 48.8653533],
		});

		this.mapbox.on('load', (event) => {
			this.mapbox.resize();
			window['map'] = this.mapbox;
		});
	}

	switchMode(systemInitiatedDark) {
		const mode = systemInitiatedDark.matches ? 'dark' : 'light';

		document.body.setAttribute('data-theme', mode);
		window['map'].setStyle(`mapbox://styles/mapbox/${mode}-v10`);
	}
}
