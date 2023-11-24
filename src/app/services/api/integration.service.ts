import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

import { EventsService } from '../events.service';
import { Integration } from 'src/app/models/integration.model';
import { LoginService } from '../db/login.service';


@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  public limit = 50;
  public offset = 0;
  public sort = "createdAt";
  public direction = "DESC";

  constructor(private http: HttpClient,public events: EventsService, public login: LoginService) { 

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
    return this.http.get(`${environment.baseBEUrl}/api/integrations?search=${query}&offset=${this.offset}&limit=${this.limit}&sort=${this.sort}&direction=${this.direction}`,this.login.createAuthorizationHeader());
  }

  stats() {
    return this.http.get(`${environment.baseBEUrl}/api/integrations/stats/get`,this.login.createAuthorizationHeader());
  }
  
  getOne(id: string) {
    return this.http.get(`${environment.baseBEUrl}/api/integrations/${id}`,this.login.createAuthorizationHeader());
  }

  getTransactions(id: string) {
    return this.http.get(`${environment.baseBEUrl}/api/integrations/${id}/transactions/`,this.login.createAuthorizationHeader());
  }
  
  getAll() {
    return this.http.get(`${environment.baseBEUrl}/api/integrations?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`,this.login.createAuthorizationHeader());
  }
  save(data:Integration) {
    if(data.id !=='')
      return this.http.put(`${environment.baseBEUrl}/api/integrations/${data.id}`, data,this.login.createAuthorizationHeader());
    else
      return this.http.post(`${environment.baseBEUrl}/api/integrations`, data,this.login.createAuthorizationHeader());
  }
  delete(item:Integration) {
    return this.http.delete(`${environment.baseBEUrl}/api/integrations/${item.id}`,this.login.createAuthorizationHeader());
  }
}
