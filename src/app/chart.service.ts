import { Injectable } from '@angular/core';
import * as Chart from '../assets/js/chart.min.js';

@Injectable()
export class ChartService {
	constructor() {

	}

	displayChart(...variables) {
		// console.log();
		// return asd;

		const chartElement = variables[1].nativeElement;
		console.log('variables[0]', variables[0]);
		console.log('variables[1]', variables[1]);
		// const tempArray = [];
		// const dateArray = [];
		// variables[0].forEach(e => {
		// 	tempArray.push(e.main.temp);
		// 	const fullDate = new Date(e.dt_txt);

		// 	dateArray.push(fullDate.getDate() + '/' + fullDate.getMonth());
		// });
		// const donutCtx = chartElement.nativeElement.getContext('2d');

		// const data = {
		// 	labels: dateArray,
		// 	datasets: [
		// 		{
		// 			data: tempArray,
		// 			backgroundColor: ['rgba(0, 180, 255, .2)'],
		// 			borderColor: ['#00b4ff'],
		// 			borderWidth: 1
		// 		}
		// 	]
		// };

		// const chart = new Chart(donutCtx, {
		// 	type: 'line',
		// 	data: data,
		// 	options: {
		// 		legend: {
		// 			display: false,
		// 			labels: {
		// 				fontColor: '#fff'
		// 			}
		// 		},
		// 		scales: {
		// 			yAxes: [
		// 				{
		// 					gridLines: {
		// 						color: 'rgba(171,171,171,1)',
		// 						lineWidth: 1
		// 					},
		// 					ticks: {
		// 						fontColor: '#fff',
		// 						fontSize: 16,
		// 						stepSize: 4,
		// 						beginAtZero: true
		// 					}
		// 				}
		// 			],
		// 			xAxes: [
		// 				{
		// 					gridLines: {
		// 						color: 'rgba(171,171,171,1)',
		// 						lineWidth: 1
		// 					},
		// 					ticks: {
		// 						fontColor: '#fff',
		// 						fontSize: 16,
		// 						beginAtZero: true
		// 					}
		// 				}
		// 			]
		// 		}
		// 	}
		// });
	}
}
