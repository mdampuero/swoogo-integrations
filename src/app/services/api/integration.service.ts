import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

import { EventsService } from '../events.service';
import { Integration } from 'src/app/models/integration.model';


@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  public limit = 50;
  public offset = 0;
  public sort = "createdAt";
  public direction = "DESC";

  constructor(private http: HttpClient,public events: EventsService) { 

  }

  calcOffset(currentPage:number){
    this.offset=currentPage*this.limit;
  }

  setOrder(sort:string){
    if(this.sort==sort)
      this.direction=(this.direction=='ASC')?'DESC':'ASC';
    else
      this.direction='ASC'
    this.sort=sort;
    this.events.publish('order', {});
  }

  get(query: string) {
    return this.http.get(`${environment.apiUrl}integrations?search=${query}&offset=${this.offset}&limit=${this.limit}&sort=${this.sort}&direction=${this.direction}`);
  }

  stats() {
    return this.http.get(`${environment.apiUrl}integrations/stats/get`);
  }
  
  getOne(id: string) {
    return this.http.get(`${environment.apiUrl}integrations/${id}`);
  }
  
  getAll() {
    return this.http.get(`${environment.apiUrl}integrations?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`);
  }
  save(data:Integration) {
    if(data.id !=='')
      return this.http.put(`${environment.apiUrl}integrations/${data.id}`, data);
    else
      return this.http.post(`${environment.apiUrl}integrations`, data);
  }
  delete(item:Integration) {
    return this.http.delete(`${environment.apiUrl}integrations/${item.id}`);
  }
}
