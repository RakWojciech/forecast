import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CityIdService} from '../../cityid.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import * as Chart from 'chart.js';
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
	displayDays = [];
	loading = false;
	avg = 0;
	dailyCharArr = [];
	DailyMeasurementArray = [];
	showContent = false;
	homeState = false;
	wrongCityName = false;
	constructor(private http: HttpClient, private _cityId: CityIdService, private router: Router) {

	}

	ngOnInit() {
		this.loading = true;
		this.homeState = true;
		this.CityNameChild.nativeElement.focus();
		this._cityId.getCityId().subscribe(
			data => {
				this.city = data;
				setTimeout(() => {
					this.cityList();
					this.loading = false;
				}, 500);
			},
			error1 => {
				console.log(error1);
				this.loading = true;
			}
		);
	}

	cityList() {
		this.city.forEach(e => {
			this.cityArray.push(e.name);
		});
	}

	displayChart(temp) {
		console.log(temp);
		const tempArray = [];
		const dateArray = [];
		temp.forEach(e => {
			tempArray.push(e.main.temp);
			const fullDate = new Date(e.dt_txt);

			dateArray.push(fullDate.getDate() + '/' + fullDate.getMonth());
		});
		const donutCtx = this.chart.nativeElement.getContext('2d');
		// dateArray = [1];

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
			this.avg = this.avg + arr[key].main.pressure / arr.length;
		});
	}

	getMeasurement(CityName) {
		this._cityId.getByName(CityName).subscribe(
			data => {
				// console.log(data);
				this.loading = false;
				this.showContent = true;
				this.homeState = false;
				this.forecastList = data;
				this.forecastData = this.forecastList.list;
				for (let i = 0; i < this.forecastData.length; i++) {
					const date = new Date(this.forecastData[i].dt_txt);
					if (!this.dateArray.includes(date.getDate())) {
						this.dateArray.push(date.getDate());
					}
				}
				this.showDays = this.dateArray.slice(0, this.dateArray.length - 1);
				this.showDays.forEach(e => {
					for (let i = 0; i < this.forecastData.length; i++) {
						const date = new Date(this.forecastData[i].dt_txt);
						if (date.getDate() === e) {
							this.displayDays.push(this.forecastData[i]);
						}
					}
				});
			},
			error1 => {
				this.loading = false;
				this.showContent = false;
			}
		);
	}

	dailyMeasurement() {
		this.DailyMeasurementArray = [];
		this.forecast = [];
		if (this.CityName) {
			this.displayDays.forEach(el => {
				let date = new Date(el.dt_txt);
				let month = ('0' + (date.getMonth() + 1)).slice(-2);
				let day = ('0' + date.getDate()).slice(-2);
				let year = date.getFullYear();
				let daily = year + '-' + month + '-' + day;
				if (daily === this.dailySort.nativeElement.value) {
					this.DailyMeasurementArray.push(el);
				}
				if (this.dailySort.nativeElement.value === '') {
					this.DailyMeasurementArray = this.displayDays;
				}
			});
			setTimeout(() => {
				this.forecast = this.DailyMeasurementArray;
			}, 500);
		}
	}

	dailyChar() {
		this.dailyCharArr = [];
		if (this.CityName) {
			this.displayDays.forEach(el => {
				let date = new Date(el.dt_txt);
				let month = ('0' + (date.getMonth() + 1)).slice(-2);
				let day = ('0' + date.getDate()).slice(-2);
				let year = date.getFullYear();
				let daily = year + '-' + month + '-' + day;
				console.log(daily, this.dailyChart.nativeElement.value);
				if (daily === this.dailyChart.nativeElement.value) {
					this.dailyCharArr.push(el);
				}
				if (this.dailyChart.nativeElement.value === '') {
					this.dailyCharArr = this.displayDays;
				}
			});
			setTimeout(() => {
				this.displayChart(this.dailyCharArr);
			}, 500);
		}
	}

	submit() {
		this.forecast = [];
		this.displayDays = [];
		this.loading = true;
		this.CityLowerCase = this.CityName.toLowerCase();
		this.CityName = this.CityLowerCase.charAt(0).toUpperCase() + this.CityLowerCase.slice(1);
		this.city.some((i, idx, array) => {
			// console.log(i)
			if (i.name === this.CityName) {
				this.getMeasurement(this.CityName);
				setTimeout(() => {
					// console.log('test');
					// console.log(this.displayDays);
					this.forecast = this.displayDays;
					// console.log(this.forecast);
					this.displayChart(this.forecast);
					this.calculateDayAvgPressure(this.forecast);
					// if (this.forecast.length <= 0) {
						// this.loading = false;
						// this.showContent = false;
						// this.homeState = false;
					// }
				}, 500);
				this.wrongCityName = false;
				return true;
			}
			// else {
			// 	if (!this.wrongCityName) {
			// 		this.loading = false;
			// 		this.showContent = false;
			// 		this.homeState = false;
			// 	}
			// 	return false;
			// }
			// else {
			// 	if (idx === 100) {
			// 		alert("OK");
			// 		// // 	this.loading = false;
			// 		// // 	this.showContent = false;
			// 		// // 	this.homeState = false;
			// 	}
			// }
			// console.log(idx, array.length - 1);
			// if (idx === array.length - 1) {
			// 	console.log(array.length);
			// // 	this.loading = false;
			// // 	this.showContent = false;
			// // 	this.homeState = false;
			// }
		});
		if (!this.wrongCityName) {
			this.loading = false;
			this.showContent = false;
			this.homeState = false;
		}
		// if(this.city)
		// console.log(this.city);
	}
}
