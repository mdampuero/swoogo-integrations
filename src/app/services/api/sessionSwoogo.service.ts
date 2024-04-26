import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { LoginService } from '../db/login.service';

@Injectable({
  providedIn: 'root'
})
export class SessionSwoogoService {

  constructor(private http: HttpClient, public login: LoginService) { 

  }

  getAll(eventId:number) {
    return this.http.get(`${environment.baseBEUrl}/api/eventSwoogos/${eventId}/sessions`,this.login.createAuthorizationHeader());
  }
}
