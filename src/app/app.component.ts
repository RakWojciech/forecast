import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CityIdService} from './cityid.service';
import {HttpClient} from '@angular/common/http';
import * as Chart from 'chart.js';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	@ViewChild('chart') chart: ElementRef;
	city;
	cityArray = [];
	CityName;
	dateArray = [];
	showDays = [];
	forecastList;
	forecastData;
	forecast = [];
	displayDays = [];
	loading = false;
	avgPressure = [];
	avg = 0;

	constructor(private http: HttpClient, private _cityId: CityIdService) {

	}

	ngOnInit() {

		this._cityId.getCityId().subscribe(data => {
			this.city = data;

			this.cityList();
		});
	}

	cityList() {
		this.city.forEach(e => {
			this.cityArray.push(e.name);
		});
	}

	displayChart(temp) {
		const tempArray = [];
		const dateArray = [];
		temp.forEach( e => {
			tempArray.push(e.main.temp);
			const fullDate = new Date(e.dt_txt);
			// let date = fullDate.
			console.log(new Date(e.dt_txt));

			dateArray.push(fullDate.getDate() + '/' + fullDate.getMonth());
		});
		console.log(tempArray);
		console.log(dateArray);
		const donutCtx = this.chart.nativeElement.getContext('2d');

		const data = {
			labels: dateArray,
			datasets: [
				{
					data: tempArray,
					backgroundColor: [
						'rgba(0, 180, 255, .2)',
					],
					borderColor: [
						'#00b4ff',
					],
					borderWidth: 1
				}]
		};

		const chart = new Chart(
			donutCtx,
			{
				type: 'line',
				data: data,
				options: {
					legend: {
						display: false,
						labels: {
							fontColor: '#fff'
						}
					},
					scales: {
						yAxes: [{
							ticks: {
								fontColor: '#fff',
								fontSize: 16,
								stepSize: 4,
								beginAtZero: true
							}
						}],
						xAxes: [{
							ticks: {
								fontColor: '#fff',
								fontSize: 16,
								beginAtZero: true
							}
						}]
					}
				}
			}
		);
	}

	calculateDayAvgPressure(e) {
		e.forEach( (val, key, arr) => {
			// console.log(arr[key].main);
			// console.log( val);
			this.avg = this.avg + arr[key].main.pressure / arr.length;
			// this.avg = Math.floor(this.avg )
		});
	}

	submit() {
		this.loading = true;
		this.city.forEach(e => {
			if (e.name === this.CityName) {

				this._cityId.getByName(e.name).subscribe(data => {

					this.forecastList = data;
					// this.forecastData = this.forecastList.list;
					for (let i = 0; i < this.forecastList.list.length; i++) {

						const date = new Date(this.forecastList.list[i].dt_txt);

						if (!this.dateArray.includes(date.getDate())) {
							this.dateArray.push(date.getDate());
						}
					}

					this.showDays = this.dateArray.slice(Math.max(this.dateArray.length - 5, 0));

					// console.log(this.showDays);
					this.showDays.forEach(e => {
						for (let i = 0; i < this.forecastList.list.length; i++) {
							const date = new Date(this.forecastList.list[i].dt_txt);
							if (date.getDate() === e) {
								this.displayDays.push(this.forecastList.list[i]);
								// this.avgPressure = e;
								// this.avgPressure.day.pressure = this.forecastData[i].main.pressure;
								// this.avgPressure.push({e : { 'pressure' : this.forecastData[i].main.pressure } });
								// console.log(this.forecastData[i]);
							}
						}
					});
					// this.avg = this.avgPressure.reduce((previous, current) => current += previous);
					// this.avg = this.avg / this.avgPressure.length;
					// console.log("AVG"+this.avg);
					// console.log(this.avgPressure);
				});
				setTimeout(() => {
					this.forecast = this.displayDays;
					this.displayChart(this.forecast);
					this.calculateDayAvgPressure(this.forecast);
					// console.log(this.displayDays);
					this.loading = false;
				}, 500);
			}
		});
	}
}
