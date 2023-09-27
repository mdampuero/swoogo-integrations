import { Component } from '@angular/core';
import { LoginService } from './services/db/login.service';
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Click Group | Agencia Tecnológica de Eventos';
  constructor(public loginService:LoginService,private translate: TranslateService) {
    translate.setDefaultLang('es');
    translate.use('es');
    setInterval(() => {   
      if(this.loginService.user){
        if((this.loginService.unixtime() - this.loginService.user.lastActivity) > (this.loginService.durationSession * 60) ){
          this.loginService.logout();
          location.reload();         
        }
      }
    }, 60000);
   }

  logout(){
    // this.loginService.logout();
    // location.reload();
  }
}
