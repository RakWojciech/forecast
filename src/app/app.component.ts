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
	@ViewChild('CityNameChild') CityNameChild: ElementRef;
	city;
	cityArray = [];
	CityName;
	CityLowerCase;
	dateArray = [];
	showDays = [];
	forecastList;
	forecastData;
	forecast = [];
	displayDays = [];
	loading = false;
	avg = 0;
	dailyCharArr = [];
	DailyMeasurement = [];
	showContent = false;

	constructor(private http: HttpClient, private _cityId: CityIdService) {

	}

	ngOnInit() {
		this.CityNameChild.nativeElement.focus()
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
		temp.forEach(e => {
			tempArray.push(e.main.temp);
			const fullDate = new Date(e.dt_txt);
			// let date = fullDate.
			// console.log(new Date(e.dt_txt));

			dateArray.push(fullDate.getDate() + '/' + fullDate.getMonth());
		});
		// console.log(tempArray);
		// console.log(dateArray);
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
		this.avg = 0;
		e.forEach((val, key, arr) => {
			// console.log(arr[key].main);
			// console.log( val);
			this.avg = this.avg + arr[key].main.pressure / arr.length;
			// this.avg = Math.floor(this.avg )
		});
	}

	getMeasurement(CityName) {
		this._cityId.getByName(CityName).subscribe(data => {
			if (data) {
				this.loading = false;
				this.showContent = true;
				this.forecastList = data;
				this.forecastData = this.forecastList.list;
				for (let i = 0; i < this.forecastData.length; i++) {

					const date = new Date(this.forecastData[i].dt_txt);

					if (!this.dateArray.includes(date.getDate())) {
						this.dateArray.push(date.getDate());
					}
				}

				this.showDays = this.dateArray.slice(Math.max(this.dateArray.length - 5, 0));

				this.showDays.forEach(e => {
					for (let i = 0; i < this.forecastData.length; i++) {
						const date = new Date(this.forecastData[i].dt_txt);
						if (date.getDate() === e) {
							this.displayDays.push(this.forecastData[i]);
						}
					}
				});
			}
		});
	}

	// DailyMeasurement(e) {
	// 	if (this.CityName) {
	// 		this.getMeasurement(this.CityName);
	// 		this.displayDays.forEach(el => {
	// 			let date = new Date(el.dt_txt);
	// 			let month = date.getMonth() + 1;
	// 			let day = date.getDate();
	// 			let year = date.getFullYear();
	// 			let daily = year + '-' + month + '-' + day;
	//
	// 			if (daily === e.srcElement.value) {
	// 				this.DailyMeasurement.push(el);
	// 				console.log(this.DailyMeasurement);
	// 			}
	// 		});
	// 		// setTimeout(() => {
	// 		// 	this.forecast = this.DailyMeasurement;
	// 		// }, 500);
	// 	}
	// }
	dailyMeasurement(e) {
		this.DailyMeasurement = [];
		if (this.CityName) {
			this.getMeasurement(this.CityName);
			this.displayDays.forEach(el => {
				let date = new Date(el.dt_txt);
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let year = date.getFullYear();
				let daily = year + '-' + month + '-' + day;

				if (daily === e.srcElement.value) {
					this.DailyMeasurement.push(el);
					console.log(this.DailyMeasurement);
				}
			});
			setTimeout(() => {
				this.forecast = this.DailyMeasurement;
			}, 500);
		}
	}
	dailyChar(e) {
		this.dailyCharArr = [];
		if (this.CityName) {
			this.getMeasurement(this.CityName);
			this.displayDays.forEach(el => {
				let date = new Date(el.dt_txt);
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let year = date.getFullYear();
				let daily = year + '-' + month + '-' + day;
				console.log(daily, e.srcElement.value);
				if (daily === e.srcElement.value) {
					this.dailyCharArr.push(el);
					console.log(this.dailyCharArr);
				}
			});
			setTimeout(() => {
				this.displayChart(this.dailyCharArr);
			}, 500);
		}
	}

	submit() {
		this.loading = true;
		this.CityLowerCase = this.CityName.toLowerCase();
		this.CityName = this.CityLowerCase.charAt(0).toUpperCase() + this.CityLowerCase.slice(1);
		console.log(this.city);
		// this.city.forEach(e => {
		// 	if (e.name === this.CityName) {
		// 		this.getMeasurement(this.CityName);
		// 		setTimeout(() => {
		// 			this.forecast = this.displayDays;
		// 			this.displayChart(this.forecast);
		// 			this.calculateDayAvgPressure(this.forecast);
		// 		}, 500);
		// 	}
		// });
	}
}
