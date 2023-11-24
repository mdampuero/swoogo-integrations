import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient} from "@angular/common/http";
import { LoginService } from '../db/login.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient,public login: LoginService) { 

  }
  
  total() {
    return this.http.get(`${environment.baseBEUrl}/api/stats/total`,this.login.createAuthorizationHeader());
  }
  
}
