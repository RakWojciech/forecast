import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CityIdService {

	constructor(private http: HttpClient) { }

	getCityId() {
		return this.http.get('/assets/data.json');
	}

	getByName(location) {
		return this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=' +
			location + '&units=metric&APPID=08ab4a922b5d987bf77948a7f68a1f8c');
	}

}
