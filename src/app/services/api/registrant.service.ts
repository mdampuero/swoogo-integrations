import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class RegistrantsService {

    constructor(private http: HttpClient) {

    }

    getAll(event_id: any) {
        return this.http.get(`${environment.baseBEUrl}/api/registrants?event_id=${event_id}`);
    }
}
