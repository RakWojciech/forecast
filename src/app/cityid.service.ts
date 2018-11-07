import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";


@Injectable()
export class CityIdService {

    private _url: string = "/assets/data.json";

    constructor(private http: HttpClient) {

    }

    getCityId() {
        return this.http.get(this._url);
    }


}