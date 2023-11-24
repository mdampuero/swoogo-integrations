import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user: any;
  public durationSession = 60;
  constructor() {
    this.loadStorage();
  }

  login(user: any) {
    // console.log(user);
    this.user = user;
    this.saveStorage();
  }

  loadStorage() {
    if (JSON.parse(localStorage.getItem("mda-software")!)) {
      this.user = JSON.parse(localStorage.getItem("mda-software")!);
    }
  }

  saveStorage() {
    this.user.lastActivity = this.unixtime();
    localStorage.setItem("mda-software", JSON.stringify(this.user));
  }

  logout() {
    localStorage.setItem("mda-software", JSON.stringify(null));
  }

  isAutenticate() {
    return (this.user) ? true : false;
  }
  createAuthorizationHeader() {
    return {
      headers: {
        "x-token": this.user.token
      }
    }
  }
  unixtime() {
    let unixtime: any = new Date().getTime() / 1000;
    return parseInt(unixtime);
  }

}
