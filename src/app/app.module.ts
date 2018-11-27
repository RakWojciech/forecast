import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

// pipe
import { RoundPipe } from './round.pipe';

// components
import { LoadingComponent } from './view/loading/loading.component';
import { HomeComponent } from './view/home/home.component';
import { ChartComponent } from './view/chart/chart.component';

// service
import { CityIdService } from './cityid.service';
import { ChartService } from './chart.service';

@NgModule({
	declarations: [
		RoundPipe,
		AppComponent,
		LoadingComponent,
		HomeComponent,
		ChartComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule
	],
	providers: [CityIdService, ChartService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
