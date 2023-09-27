import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/services/api/users.service';
import { msgErrors } from 'src/app/services/msgErrors.service';
// import * as $ from 'jquery';
import {Router, ActivatedRoute} from '@angular/router';
import { Users } from 'src/app/models/users.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html'
})
export class UsersFormComponent implements OnInit {
  public form: Users={
    id:'',
    name:'',
    email:'',
    password:'',
    passwordRepeat:'',
    plainPassword:{},
    role:'',
    isActive:1
  };
  public titlePage:string='Nuevo';

  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/usuarios',title:'Usuarios'},
    {url:'',title:'Nuevo'}
  ];

  constructor(
    private _msgErrors: msgErrors,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public usersService: UsersService) {
      let id=this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        this.getOne(id);
        this.breadcrumbs[(this.breadcrumbs.length - 1 )].title='Editar';
        this.titlePage='Editar';
      }
    }

  getOne(id:string){
    this.spinner.show();
    this.usersService.getOne(id).subscribe(
      (data:any) => {
        this.form=data.user;
        this.form.isActive = (data.user.isActive) ? 1 : 0
        console.log(this.form);
        
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  ngOnInit(): void {
    
  }

  save(form:NgForm){
    this.spinner.show();
    this.usersService.save(this.form).subscribe(
      (data:any) => {
        this._snackBar.open('Registro creado','Aceptar', { duration: 3000 });
        this.router.navigate(['/usuarios']);
      },
      (error) => this._msgErrors.show(error)
    );
  }

}
