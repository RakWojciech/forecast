import { Component, ElementRef, OnInit, ViewChild, Input, AfterContentInit } from '@angular/core';
import { CityIdService } from '../../cityid.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as Chart from '../../../assets/js/chart.min.js';
import { ChartComponent } from '../chart/chart.component';
import { ChartService } from '../../chart.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	// @Input() chart: ChartComponent;
	@ViewChild('dailyChart') dailyChart: ElementRef;
	@ViewChild('dailySort') dailySort: ElementRef;
	@ViewChild('CityNameChild') CityNameChild: ElementRef;
	city;
	cityID;
	cityArray = [];
	CityName;
	CityLowerCase;
	dateArray = [];
	showDays = [];
	forecastList;
	forecastData;
	forecast = [];
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
	data = ['a', 'b', 'c', 'd'];
	obj = {};
	array = [];
	temp;
	appStatus;

	constructor(
		private http: HttpClient,
		private _cityId: CityIdService,
		private router: Router,
		private chartSer: ChartService
	) { }

	ngOnInit() {
		this.CityNameChild.nativeElement.focus();
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
					// console.log('here');
					// console.log(this.forecast);
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
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		const year = date.getFullYear();
		this.daily = year + '-' + month + '-' + day;
	}
	dailyMeasurement() {
		this.DailyMeasurementArray = [];
		if (this.CityName) {
			this.forecast.forEach(el => {
				const date = new Date(el.dt_txt);
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
				// console.log(el);
				const date = new Date(el.dt_txt);
				this.createDate(date);
				if (this.daily === this.dailyChart.nativeElement.value) {
					this.dailyCharArr.push(el);
				}
				if (this.dailyChart.nativeElement.value === '') {
					this.dailyCharArr = this.forecast;
				}
			});
			setTimeout(() => {
				// this.chartSer.displayChart(this.dailyCharArr);
				this.temp = this.dailyCharArr;
				// this.chart.displayChart(this.dailyCharArr);
			}, 500);
		}
	}
	getCityData() {
		return new Promise((resolve, reject) => {
			// console.log("tutej");
			console.log(this.city);
			this.city.some((i, idx, array) => {
				if (i.name === this.CityName) {
					this.getMeasurement(this.CityName).then(() => {
						// this.chartSer.displayChart(this.forecast);
						this.temp = this.forecast;
						// this.chart.displayChart(this.forecast);
						this.calculateDayAvgPressure(this.forecast);
						this.wrongCityName = false;
						this.loading = false;
						this.homeState = true;
						return true;
					});
				}
			});
			setTimeout(() => {
				resolve();
			}, 500);
		});
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
				const temp = [];
				for (let i = 0; i < this.CityLowerCase.split(' ').length; i++) {
					temp[i] = this.CityLowerCase.split(' ')[i];
					temp[i] = temp[i].charAt(0).toUpperCase() + temp[i].slice(1);
				}
				this.CityName = temp.join(' ');
				console.log(this.city);
				this.getCityData().then(() => {
					if (this.wrongCityName) {
						this.loading = false;
						this.showContent = false;
						this.homeState = false;
					}
				});
			}
		);
	}
}
