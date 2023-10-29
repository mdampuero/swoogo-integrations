import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { EventsService } from '../events.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  public limit = 4;
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
    return this.http.get(`${environment.baseBEUrl}/api/transactions?search=${query}&offset=${this.offset}&limit=${this.limit}&sort=${this.sort}&direction=${this.direction}`);
  }
  stats() {
    return this.http.get(`${environment.baseBEUrl}/api/transactions/stats/get`);
  }
  getOne(id: string) {
    return this.http.get(`${environment.baseBEUrl}/api/transactions/${id}`);
  }
  getAll() {
    return this.http.get(`${environment.baseBEUrl}/api/transactions?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`);
  }
  
}
