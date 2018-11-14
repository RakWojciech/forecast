import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CityIdService} from '../../cityid.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
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
	displayDays = [];
	loading = false;
	avg = 0;
	dailyCharArr = [];
	DailyMeasurementArray = [];
	showContent = false;
	homeState = false;
	wrongCityName = false;
	StopIteration;
	firstDate;
	lastDate;
	daily;

	constructor(private http: HttpClient, private _cityId: CityIdService, private router: Router) {}

	ngOnInit() {
		this.loading = true;
		this.homeState = true;
		this.getCity();
	}
	getCity() {
		this._cityId.getCityId().subscribe(
			data => {
				this.city = data;
				setTimeout(() => {
					this.cityList();
					this.loading = false;
					this.CityNameChild.nativeElement.focus();
				}, 500);
			},
			error => {
				console.log(error);
				this.loading = true;
				this.showContent = false;
			}
		);
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

			dateArray.push(fullDate.getDate() + '/' + fullDate.getMonth());
		});
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
				}
			]
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
						}],
						xAxes: [{
							gridLines: {
								color: 'rgba(171,171,171,1)',
								lineWidth: 1
							},
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
					if (i === 0) {
						this.createDate(date);
						this.firstDate = this.daily;
						// console.log(this.firstDate);
					} else if (i === this.forecastData.length - 1) {
						this.createDate(date);
						this.lastDate = this.daily;
						// console.log(this.firstDate);
					}
					if (!this.dateArray.includes(date.getDate())) {
						this.dateArray.push(date.getDate());
					}
				}
				// console.log(this.dateArray);
				// this.showDays = this.dateArray.slice(0, this.dateArray.length - 1);
				this.showDays = this.dateArray.slice(Math.max(this.dateArray.length - 5));
				this.showDays.forEach(e => {
					for (let i = 0; i < this.forecastData.length; i++) {
						const date = new Date(this.forecastData[i].dt_txt);
						if (date.getDate() === e) {
							this.displayDays.push(this.forecastData[i]);
						}
					}
				});
			},
			error => {
				console.log(error);
				this.loading = true;
				this.showContent = false;
			}
		);
	}
	createDate(date) {
		let month = ('0' + (date.getMonth() + 1)).slice(-2);
		let day = ('0' + date.getDate()).slice(-2);
		let year = date.getFullYear();
		this.daily = year + '-' + month + '-' + day;
	}
	dailyMeasurement() {
		this.DailyMeasurementArray = [];
		this.forecast = [];
		if (this.CityName) {
			this.displayDays.forEach(el => {
				let date = new Date(el.dt_txt);
				this.createDate(date);
				if (this.daily === this.dailySort.nativeElement.value) {
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
				this.createDate(date);
				if (this.daily === this.dailyChart.nativeElement.value) {
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
		this.wrongCityName = true;
		this.forecast = [];
		this.displayDays = [];
		this.loading = true;
		this.CityLowerCase = this.CityName.toLowerCase();
		let temp = [];
		for (let i = 0; i < this.CityLowerCase.split(' ').length; i++) {
			temp[i] = this.CityLowerCase.split(' ')[i];
			temp[i] = temp[i].charAt(0).toUpperCase() + temp[i].slice(1);
			// console.log(temp);
		}
		this.CityName = temp.join(' ');
		// console.log(this.CityName);
		this.city.some((i, idx, array) => {
			// console.log(i.name);
			if (i.name === this.CityName) {
				this.getMeasurement(this.CityName);
				setTimeout(() => {
					this.forecast = this.displayDays;
					this.displayChart(this.forecast);
					this.calculateDayAvgPressure(this.forecast);
				}, 500);
				this.wrongCityName = false;
				return true;
			}
		});
		if ( this.wrongCityName ) {
			this.loading = false;
			this.showContent = false;
			this.homeState = false;
		}
	}
}
