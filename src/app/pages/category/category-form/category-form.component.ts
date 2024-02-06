import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/services/api/category.service';
import { msgErrors } from 'src/app/services/msgErrors.service';
// import * as $ from 'jquery';
import {Router, ActivatedRoute} from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {
  public form: Category={
    id:'',
    name:'',
    inHome: 0,
  };
  public titlePage:string='Nuevo';

  public breadcrumbs=[
    {url:'/admin/inicio',title:'Inicio'},
    {url:'/admin/categories',title:'Categorías'},
    {url:'',title:'Nuevo'}
  ];

  constructor(
    private _msgErrors: msgErrors,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public categoryService: CategoryService) {
      let id=this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        this.getOne(id);
        this.breadcrumbs[(this.breadcrumbs.length - 1 )].title='Editar';
        this.titlePage='Editar';
      }
    }

  getOne(id:string){
    this.spinner.show();
    this.categoryService.getOne(id).subscribe(
      (data:any) => {
        this.form=data.category;
        this.form.inHome = (data.category.inHome) ? 1 : 0
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  ngOnInit(): void {
    
  }

  save(form:NgForm){
    this.spinner.show();
    this.categoryService.save(this.form).subscribe(
      (data:any) => {
        this._snackBar.open('Registro creado','Aceptar', { duration: 3000 });
        this.router.navigate(['/admin/categories']);
      },
      (error) => this._msgErrors.show(error)
    );
  }

}
