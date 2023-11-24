import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { LoginService } from '../db/login.service';

@Injectable({
    providedIn: 'root'
})
export class RegistrantsService {

    constructor(private http: HttpClient, public login: LoginService) {

    }

    getAll(event_id: any) {
        return this.http.get(`${environment.baseBEUrl}/api/registrants?event_id=${event_id}`,this.login.createAuthorizationHeader());
    }
}
