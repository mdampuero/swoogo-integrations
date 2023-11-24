import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Users } from 'src/app/models/users.model';
import { EventsService } from '../events.service';
import { LoginService } from '../db/login.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public limit = 30;
  public offset = 0;
  public sort = "createdAt";
  public direction = "DESC";

  constructor(private http: HttpClient,public events: EventsService, public loginService: LoginService) { 

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
    return this.http.get(`${environment.baseBEUrl}/api/users?search=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}`,this.loginService.createAuthorizationHeader());
  }
  stats() {
    return this.http.get(`${environment.baseBEUrl}/api/users/stats/get`,this.loginService.createAuthorizationHeader());
  }
  getOne(id: string) {
    return this.http.get(`${environment.baseBEUrl}/api/users/${id}`,this.loginService.createAuthorizationHeader());
  }
  getAll() {
    return this.http.get(`${environment.baseBEUrl}/api/users?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`,this.loginService.createAuthorizationHeader());
  }
  save(data:Users) {
    if(data.id !=='')
      return this.http.put(`${environment.baseBEUrl}/api/users/${data.id}`, data,this.loginService.createAuthorizationHeader());
    else
      return this.http.post(`${environment.baseBEUrl}/api/users`, data,this.loginService.createAuthorizationHeader());
  }
  login(data:any) {
    return this.http.post(`${environment.baseBEUrl}/api/auth/login`, data);
  }
  delete(item:Users) {
    return this.http.delete(`${environment.baseBEUrl}/api/users/${item.id}`,this.loginService.createAuthorizationHeader());
  }
  
}
