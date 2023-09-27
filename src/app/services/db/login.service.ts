import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user:any;
  public durationSession=60;
  constructor() {
    this.loadStorage();
  }

  login(user:any) {
    this.user = user;
    this.saveStorage();
  }

  loadStorage() {
    if (JSON.parse(localStorage.getItem("mda-software-smartpro-admin")!)) {
      this.user = JSON.parse(localStorage.getItem("mda-software-smartpro-admin")!);
    }
  }

  saveStorage() {
    this.user.lastActivity=this.unixtime();
    localStorage.setItem("mda-software-smartpro-admin", JSON.stringify(this.user));
  }

  logout() {
    localStorage.setItem("mda-software-smartpro-admin", JSON.stringify(null));
  }
  
  isAutenticate(){
    return (this.user)?true:false;
  }

  unixtime(){
    let unixtime:any=new Date().getTime() / 1000;
    return parseInt(unixtime);
  }

}
