import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { 

  }
  
  total() {
    return this.http.get(`${environment.baseBEUrl}/api/stats/total`);
  }
  
}
