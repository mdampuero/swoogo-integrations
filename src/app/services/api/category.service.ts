import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Category } from 'src/app/models/category.model';
import { EventsService } from '../events.service';
import { LoginService } from '../db/login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
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
    
    return this.http.get(`${environment.baseBEUrl}/api/categories?search=${query}&offset=${this.offset}&limit=${this.limit}&sort=${this.sort}&direction=${this.direction}`, this.login.createAuthorizationHeader());
  }
  stats() {
    return this.http.get(`${environment.baseBEUrl}/api/categories/stats/get`,this.login.createAuthorizationHeader());
  }
  getOne(id: string) {
    return this.http.get(`${environment.baseBEUrl}/api/categories/${id}`,this.login.createAuthorizationHeader());
  }
  getAll() {
    return this.http.get(`${environment.baseBEUrl}/api/categories?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`,this.login.createAuthorizationHeader());
  }
  save(data:Category) {
    if(data.id !=='')
      return this.http.put(`${environment.baseBEUrl}/api/categories/${data.id}`, data,this.login.createAuthorizationHeader());
    else
      return this.http.post(`${environment.baseBEUrl}/api/categories`, data, this.login.createAuthorizationHeader());
  }
  delete(item:Category) {
    return this.http.delete(`${environment.baseBEUrl}/api/categories/${item.id}`,this.login.createAuthorizationHeader());
  }
}
