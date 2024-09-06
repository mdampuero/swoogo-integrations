import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DemoService } from 'src/app/services/api/demo.service';
import { msgErrors } from 'src/app/services/msgErrors.service';
// import * as $ from 'jquery';
import {Router, ActivatedRoute} from '@angular/router';
import { Demo } from 'src/app/models/demo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html'
})
export class DemoFormComponent implements OnInit {
  public form: Demo={
    id:'',
    name:'',
    description:''
  };
  public titlePage:string='Nuevo';

  public breadcrumbs=[
    {url:'/admin/inicio',title:'Inicio'},
    {url:'/admin/demos',title:'Demos'},
    {url:'',title:'Nuevo'}
  ];

  constructor(
    private _msgErrors: msgErrors,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public demoService: DemoService) {
      let id=this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        this.getOne(id);
        this.breadcrumbs[(this.breadcrumbs.length - 1 )].title='Editar';
        this.titlePage='Editar';
      }
    }

  getOne(id:string){
    this.spinner.show();
    this.demoService.getOne(id).subscribe(
      (data:any) => {
        this.form=data.demo;
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  ngOnInit(): void {
    
  }

  save(form:NgForm){
    this.spinner.show();
    this.demoService.save(this.form).subscribe(
      (data:any) => {
        this.spinner.hide();
        this._snackBar.open('Registro guardado','Aceptar', { duration: 3000 });
        this.router.navigate(['/admin/demos']);
      },
      (error) => this._msgErrors.show(error)
    );
  }

}
