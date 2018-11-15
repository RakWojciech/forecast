import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CityIdService } from '../../cityid.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as Chart from '../../../assets/js/chart.min.js';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	@ViewChild('chart') chart: ElementRef;
	@ViewChild('dailyChart') dailyChart: ElementRef;
	@ViewChild('dailySort') dailySort: ElementRef;
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
	// displayDays = [];
	// displayDaysTest = [];
	loading = false;
	avg = 0;
	dailyCharArr = [];
	DailyMeasurementArray = [];
	showContent = false;
	homeState = true;
	wrongCityName = false;
	StopIteration;
	firstDate;
	lastDate;
	daily;

	obj = {};
	array = [];

	appStatus;

	constructor(
		private http: HttpClient,
		private _cityId: CityIdService,
		private router: Router
	) { }

	ngOnInit() {
		this.CityNameChild.nativeElement.focus();
		// this.loading = true;
		// this.homeState = true;
	}
	getCity() {
		return new Promise((resolve, reject) => {
			this._cityId.getCityId().subscribe(
				data => {
					this.city = data;
				},
				error => {
					console.log(error);
					this.loading = true;
					this.showContent = false;
				}
			);
			setTimeout(() => {
				resolve();
			}, 500);
		});
	}

	displayChart(temp) {
		const tempArray = [];
		const dateArray = [];
		temp.forEach(e => {
			tempArray.push(e.main.temp);
			const fullDate = new Date(e.dt_txt);

			dateArray.push(fullDate.getDate() + '/' + fullDate.getMonth());
		});
		const donutCtx = this.chart.nativeElement.getContext('2d');

		const data = {
			labels: dateArray,
			datasets: [
				{
					data: tempArray,
					backgroundColor: ['rgba(0, 180, 255, .2)'],
					borderColor: ['#00b4ff'],
					borderWidth: 1
				}
			]
		};

		const chart = new Chart(donutCtx, {
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
					yAxes: [
						{
							gridLines: {
								color: 'rgba(171,171,171,1)',
								lineWidth: 1
							},
							ticks: {
								fontColor: '#fff',
								fontSize: 16,
								stepSize: 4,
								beginAtZero: true
							}
						}
					],
					xAxes: [
						{
							gridLines: {
								color: 'rgba(171,171,171,1)',
								lineWidth: 1
							},
							ticks: {
								fontColor: '#fff',
								fontSize: 16,
								beginAtZero: true
							}
						}
					]
				}
			}
		});
	}

	calculateDayAvgPressure(e) {
		this.avg = 0;
		e.forEach((val, key, arr) => {
			this.avg = this.avg + arr[key].main.pressure / arr.length;
		});
	}

	getMeasurement(CityName) {
		return new Promise((resolve, reject) => {
			this._cityId.getByName(CityName).subscribe(
				data => {
					// this.loading = false;
					this.showContent = true;
					this.forecastList = data;
					this.forecastData = this.forecastList.list;

					// for loop for start and end date in calendar
					for (let i = 0; i < this.forecastData.length; i++) {
						const date = new Date(this.forecastData[i].dt_txt);
						if (i === 0) {
							this.createDate(date);
							this.firstDate = this.daily;
						} else if (i === this.forecastData.length - 1) {
							this.createDate(date);
							this.lastDate = this.daily;
							console.log(this.lastDate);
						}
						if (!this.dateArray.includes(date.getDate())) {
							this.dateArray.push(date.getDate());
						}
					}

					// prepare days to display
					this.showDays = this.dateArray.slice(
						Math.max(this.dateArray.length - 5)
					);

					// check if date is the same and yes push data object into displayDays
					this.showDays.forEach(e => {
						for (let i = 0; i < this.forecastData.length; i++) {
							const date = new Date(this.forecastData[i].dt_txt);
							if (date.getDate() === e) {
								this.forecast.push(this.forecastData[i]);
							}
						}
					});
					console.log('here');
					console.log(this.forecast);
				},
				error => {
					console.log(error);
					this.loading = true;
					this.showContent = false;
				}
			);
			setTimeout(() => {
				resolve();
			}, 500);
		});
	}
	createDate(date) {
		let month = ('0' + (date.getMonth() + 1)).slice(-2);
		let day = ('0' + date.getDate()).slice(-2);
		let year = date.getFullYear();
		this.daily = year + '-' + month + '-' + day;
	}
	dailyMeasurement() {
		this.DailyMeasurementArray = [];
		let fullForecast = this.forecast;
		if (this.CityName) {
			this.forecast.forEach(el => {
				let date = new Date(el.dt_txt);
				// console.log(date);
				this.createDate(date);
				console.log(this.daily, this.dailySort.nativeElement.value);
				if (this.daily === this.dailySort.nativeElement.value) {
					this.DailyMeasurementArray.push(el);
				}
				if (this.dailySort.nativeElement.value === '') {
					// this.getMeasurement(this.CityName).then(() => {
					this.DailyMeasurementArray = this.forecast;
					// });
				}
			});
			setTimeout(() => {
				this.forecast = this.DailyMeasurementArray;
			}, 500);
		}
	}

	dailyChartData() {
		this.dailyCharArr = [];
		if (this.CityName) {
			this.forecast.forEach(el => {
				console.log(el);
				let date = new Date(el.dt_txt);
				this.createDate(date);
				if (this.daily === this.dailyChart.nativeElement.value) {
					this.dailyCharArr.push(el);
				}
				if (this.dailyChart.nativeElement.value === '') {
					this.dailyCharArr = this.forecast;
				}
			});
			setTimeout(() => {
				this.displayChart(this.dailyCharArr);
			}, 500);
		}
	}

	submit() {
		this.loading = true;
		this.homeState = true;
		this.showContent = false;
		this.getCity().then(
			() => {
				this.wrongCityName = true;
				this.forecast = [];
				this.loading = true;
				this.CityLowerCase = this.CityName.toLowerCase();
				let temp = [];
				for (let i = 0; i < this.CityLowerCase.split(' ').length; i++) {
					temp[i] = this.CityLowerCase.split(' ')[i];
					temp[i] = temp[i].charAt(0).toUpperCase() + temp[i].slice(1);
				}
				this.CityName = temp.join(' ');

				this.city.some((i, idx, array) => {
					if (i.name === this.CityName) {
						this.getMeasurement(this.CityName).then(() => {
							this.displayChart(this.forecast);
							this.calculateDayAvgPressure(this.forecast);
							this.wrongCityName = false;
							this.loading = false;
							this.homeState = true;
							return true;
						});
					}
				});
				if (this.wrongCityName) {
					this.loading = false;
					this.showContent = false;
					this.homeState = false;
				}
			}
		);
	}
}
