import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CityIdService} from './cityid.service';
import {HttpClient} from '@angular/common/http';
import * as Chart from 'chart.js';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor() {

	}
}
