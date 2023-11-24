import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './db/login.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class msgErrors {
  
  constructor(
    public loginService:LoginService,
    public router:Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService
    ) {}
  
  show(error:any){
    this.spinner.hide();
    if(error.status==400){
      const errors=error.error.data.errors;
      errors.forEach((err:any) => {  
        this.toastr.error(this.translateService.instant(err.msg) ,'Atención');
      });
    }
  }
}
