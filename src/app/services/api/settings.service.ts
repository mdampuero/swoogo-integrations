import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { LoginService } from '../db/login.service';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor(private http: HttpClient, public login: LoginService) {

    }

    get() {
        return this.http.get(`${environment.baseBEUrl}/api/settings`, this.login.createAuthorizationHeader());
    }
    
    save(data: any) {
        return this.http.put(`${environment.baseBEUrl}/api/settings`, data, this.login.createAuthorizationHeader());
    }

}
