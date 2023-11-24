import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { EventsService } from '../events.service';
import { LoginService } from '../db/login.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient,public events: EventsService, public login: LoginService) { 

  }

  getAll() {
    return this.http.get(`${environment.baseBEUrl}/api/events`,this.login.createAuthorizationHeader());
  }
}
