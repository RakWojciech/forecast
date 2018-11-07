import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {AppComponent} from './app.component';


import {CityIdService} from "./cityid.service";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [CityIdService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
