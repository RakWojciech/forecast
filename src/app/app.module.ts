import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {RoundPipe} from './round.pipe';

import {CityIdService} from './cityid.service';
import { LoadingComponent } from './view/loading/loading.component';
import { HomeComponent } from './view/home/home.component';

@NgModule({
	declarations: [
		RoundPipe,
		AppComponent,
		LoadingComponent,
		HomeComponent
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
