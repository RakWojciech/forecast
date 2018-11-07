import {Component, OnInit} from '@angular/core';
import {CityIdService} from "./cityid.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    city;
    CityName;
    pogoda;
    pogodaa = [
        {
            "coord":
                {"lon": 145.77, "lat": -16.92},
            "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
            "base": "cmc stations",
            "main": {"temp": 293.25, "pressure": 1019, "humidity": 83, "temp_min": 289.82, "temp_max": 295.37},
            "wind": {"speed": 5.1, "deg": 150},
            "clouds": {"all": 75},
            "rain": {"3h": 3},
            "dt": 1435658272,
            "sys": {"type": 1, "id": 8166, "message": 0.0166, "country": "AU", "sunrise": 1435610796, "sunset": 1435650870},
            "id": 2172797,
            "name": "Cairns",
            "cod": 200
        },
        {
            "coord":
                {"lon": 145.77, "lat": -16.92},
            "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
            "base": "cmc stations",
            "main": {"temp": 293.25, "pressure": 1019, "humidity": 83, "temp_min": 289.82, "temp_max": 295.37},
            "wind": {"speed": 5.1, "deg": 150},
            "clouds": {"all": 75},
            "rain": {"3h": 3},
            "dt": 1435658272,
            "sys": {"type": 1, "id": 8166, "message": 0.0166, "country": "AU", "sunrise": 1435610796, "sunset": 1435650870},
            "id": 2172797,
            "name": "Cairns",
            "cod": 200
        },
        {
            "coord":
                {"lon": 145.77, "lat": -16.92},
            "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
            "base": "cmc stations",
            "main": {"temp": 293.25, "pressure": 1019, "humidity": 83, "temp_min": 289.82, "temp_max": 295.37},
            "wind": {"speed": 5.1, "deg": 150},
            "clouds": {"all": 75},
            "rain": {"3h": 3},
            "dt": 1435658272,
            "sys": {"type": 1, "id": 8166, "message": 0.0166, "country": "AU", "sunrise": 1435610796, "sunset": 1435650870},
            "id": 2172797,
            "name": "Cairns",
            "cod": 200
        },
        {
            "coord":
                {"lon": 145.77, "lat": -16.92},
            "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
            "base": "cmc stations",
            "main": {"temp": 293.25, "pressure": 1019, "humidity": 83, "temp_min": 289.82, "temp_max": 295.37},
            "wind": {"speed": 5.1, "deg": 150},
            "clouds": {"all": 75},
            "rain": {"3h": 3},
            "dt": 1435658272,
            "sys": {"type": 1, "id": 8166, "message": 0.0166, "country": "AU", "sunrise": 1435610796, "sunset": 1435650870},
            "id": 2172797,
            "name": "Cairns",
            "cod": 200
        },
        {
            "coord":
                {"lon": 145.77, "lat": -16.92},
            "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
            "base": "cmc stations",
            "main": {"temp": 293.25, "pressure": 1019, "humidity": 83, "temp_min": 289.82, "temp_max": 295.37},
            "wind": {"speed": 5.1, "deg": 150},
            "clouds": {"all": 75},
            "rain": {"3h": 3},
            "dt": 1435658272,
            "sys": {"type": 1, "id": 8166, "message": 0.0166, "country": "AU", "sunrise": 1435610796, "sunset": 1435650870},
            "id": 2172797,
            "name": "Cairns",
            "cod": 200
        }
    ];

    forecast = {
        "id": "",
        "name": "",
        "country": "",
    };

    constructor(private http: HttpClient, private _cityId: CityIdService) {

    }

    showConfig() {
    }

    ngOnInit() {
        this._cityId.getCityId().subscribe(data => this.city = data);
    }

    submit() {
        // console.log(this.city);
        this.city.forEach(e => {
            // console.log(e);
            if (e.name == this.CityName) {
                // console.log(e.name);

                this.http.get("api.openweathermap.org/data/2.5/weather?q=" + e.name + "&APPID=08ab4a922b5d987bf77948a7f68a1f8c").subscribe(data => this.pogoda = data);
                // this.forecast["id"] = e.id;
                // this.forecast["name"] = e.name;
                // this.forecast["country"] = e.country;
                console.log(this.pogodaa);
            }
        });

        // console.log(this.forecast);
    }
}
