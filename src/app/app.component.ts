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
    pogodaaa;
    // dt;
    // dateArray = [];
    // forecast = [];
    // showDays = [];
    forecastList;
    forecast = [];
    constructor(private http: HttpClient, private _cityId: CityIdService) {

    }
    ngOnInit() {
        this._cityId.getCityId().subscribe(data => this.city = data);
    }
    daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }
    submit() {
        // console.log(this.city);
        this.city.forEach((e,index) => {
            // console.log(e);
            if (e.name == this.CityName) {
                console.log(e.name);

                this._cityId.getByName(e.name).subscribe(data => {

                    this.forecastList = data;
                    // let count = 0;
                    // for(var i = 0; i < this.pogodaaa.list.length; i++) {
                        // console.log(this.pogodaaa.list[i]);
                        // var date = new Date(this.pogodaaa.list[i].dt)
                        // var month = date.getDate();    
                        // var year = date.getFullYear();    
                        // console.log(this.daysInMonth(month, year))
                        // var date = new Date(this.pogodaaa.list[i].dt_txt);
                        // if(!this.dateArray.includes(date.getDate())) this.dateArray.push(date.getDate());
                       
                        // console.log(this.dateArray);
                        
                        // let count = 0;
                        // for(let j = this.pogodaaa.list.length; i--;) {
                        //     // 
                        //     if(count < 5) console.log(this.dateArray[j]);
                        //     count++;
                        // }
                        // console.log(this.dateArray)
                        // console.log( date.getDate());

                        // if(count < 5) {
                        // }
                        // count++;
                    // }
                    // let count = 0;
                    // for(let j = this.dateArray.length; j--;) {
                    //     if(count < 5) this.showDays.push(this.dateArray(j));
                    //     count++;
                    // }
                    // console.log(this.showDays);
                });
                // this.forecast["id"] = e.id;
                // this.forecast["name"] = e.name;
                // this.forecast["country"] = e.country;
                // console.log(this.pogoda);
                setTimeout(()=>{
                    // console.log(this.pogodaaa.list[index]);
                    // let count = 0;
                    // for(let i = this.pogodaaa.list.length; i--;) {
                    //     // 
                    //     if(count < 5) this.forecast.push(this.pogodaaa.list[i]);
                    //     count++;
                    // }

                    // console.log(this.forecast = this.pogodaaa.list);
                    console.log(this.forecast = this.forecastList.list);
                    // this.forecast.dt = this.pogodaaa.dt;
                    // this.forecast.name = e.name;
                }, 500);
            }
        });

        // console.log(this.forecast);
    }
}
