import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { EventsService } from '../events.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient,public events: EventsService) { 

  }

  getAll() {
    return this.http.get(`${environment.apiUrl}events`);
  }
}
