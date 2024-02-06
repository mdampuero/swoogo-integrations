import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/services/api/users.service';
import { LoginService } from 'src/app/services/db/login.service';
import { ToastrService } from 'ngx-toastr';
import { msgErrors } from 'src/app/services/msgErrors.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form={
    email:'',
    password:''
  }
  constructor(
    private _msgErrors: msgErrors,
    private spinner: NgxSpinnerService,
    private router: Router,
    private usersService: UsersService,
    private loginService:LoginService
    ) { 
      //this.router.navigate(['/']);
    }

  ngOnInit(): void {
  }

  save(form:NgForm){
    this.spinner.show();
    this.usersService.login(this.form).subscribe(
      (data:any) => {
        this.loginService.login(data);
        this.spinner.hide();
        this.router.navigate(['/admin/inicio']);
      },
      (error) => this._msgErrors.show(error)
    );
  }
  // save(form:NgForm){
  //   this.spinner.show();
  //   // $(".text-danger").remove();
  //   this.usersService.login(this.form).subscribe(
  //     (data:any) => {
  //       this.loginService.login(data);
  //       this.spinner.hide();
  //       location.reload();
  //     },
  //     (error) => {
  //       console.log(error);
        
  //       if(error.status==400){
  //         this.toastr.error('Hello world!', 'Toastr fun!');
  //       }
  //         // Object.entries(error.error.form.errors.children).forEach(
  //         //   ([key, value]) => this.callback(key,value)
  //         // );
  //       this.spinner.hide();
  //     }
  //   );
  // }

}
