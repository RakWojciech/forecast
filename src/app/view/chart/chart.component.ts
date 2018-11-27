import { Component, ElementRef, OnInit, ViewChild, Input, AfterContentInit } from '@angular/core';
import { CityIdService } from '../../cityid.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChartService } from '../../chart.service';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterContentInit {
	@ViewChild('chart') chartElement: ElementRef;


	@Input() count: number;
	// question = [];

	constructor(
		private http: HttpClient,
		private _cityId: CityIdService,
		private router: Router,
		private chart: ChartService
	) { }

	ngOnInit() {
		// this.question = this.data;
	}

	ngAfterContentInit() {

		// console.log(typeof ());
		this.chart.displayChart(this.count, this.chartElement);
	}


}
