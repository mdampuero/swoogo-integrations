import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Demo } from 'src/app/models/demo.model';
import { EventsService } from '../events.service';
import { LoginService } from '../db/login.service';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  public limit = 4;
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
    
    return this.http.get(`${environment.baseBEUrl}/api/demos?search=${query}&offset=${this.offset}&limit=${this.limit}&sort=${this.sort}&direction=${this.direction}`, this.login.createAuthorizationHeader());
  }
  stats() {
    return this.http.get(`${environment.baseBEUrl}/api/demos/stats/get`,this.login.createAuthorizationHeader());
  }
  getOne(id: string) {
    return this.http.get(`${environment.baseBEUrl}/api/demos/${id}`,this.login.createAuthorizationHeader());
  }
  getAll() {
    return this.http.get(`${environment.baseBEUrl}/api/demos?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`,this.login.createAuthorizationHeader());
  }
  save(data:Demo) {
    if(data.id !=='')
      return this.http.put(`${environment.baseBEUrl}/api/demos/${data.id}`, data,this.login.createAuthorizationHeader());
    else
      return this.http.post(`${environment.baseBEUrl}/api/demos`, data, this.login.createAuthorizationHeader());
  }
  delete(item:Demo) {
    return this.http.delete(`${environment.baseBEUrl}/api/demos/${item.id}`,this.login.createAuthorizationHeader());
  }
}
