import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from 'src/app/services/api/event.service';
import { msgErrors } from 'src/app/services/msgErrors.service';
// import * as $ from 'jquery';
import {Router, ActivatedRoute} from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/api/category.service';
import { forkJoin } from 'rxjs';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { EventSwoogoService } from 'src/app/services/api/eventSwoogo.service';



export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class EventFormComponent implements OnInit {
  public datePickerStart:any;
  public datePickerEnd:any;
  public form: Event={
    id:'',
    name:'',
    pictureBackground:'',
    pictureCard:'',
    description:'',
    category: '',
    duration:'',
    isActive: 1,
    inHome: 0,
    inSwoogo: 0,
    start_date:'',
    start_time:'',
    end_date:'',
    end_time:'',
    url:'',
    eventSwoogo: ''
  };
  public categories: any;
  public eventsSwoogo: any;
  public titlePage:string='Nuevo';

  public breadcrumbs=[
    {url:'/admin/inicio',title:'Inicio'},
    {url:'/admin/events',title:'Eventos'},
    {url:'',title:'Nuevo'}
  ];

  constructor(
    private _msgErrors: msgErrors,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public eventService: EventService,
    public categoryService: CategoryService,
    public eventSwoogoService: EventSwoogoService,
    ) {
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.loadForm(id);
        this.breadcrumbs[(this.breadcrumbs.length - 1)].title = 'Editar';
        this.titlePage = 'Editar';
      } else {
        this.loadForm('');
      }
    }


  loadForm(id: any) {
     this.spinner.show();
    if (id) {
      forkJoin({
        category: this.categoryService.getAll(),
        event: this.eventService.getOne(id),
        swoogo: this.eventSwoogoService.getAll(),
      }).subscribe({
        next: (data: any) => {
          this.form = data.event.event;
          this.categories = data.category.data;
          this.eventsSwoogo = data.swoogo.data;
          this.form.category = data.event.event.category._id
          this.form.isActive = (data.event.event.isActive) ? 1 : 0
          this.form.inHome = (data.event.event.inHome) ? 1 : 0
          this.form.inSwoogo = (data.event.event.inSwoogo) ? 1 : 0
          this.form.eventSwoogo = (data.event.event.inSwoogo) ? data.event.event.eventSwoogo : ''
          this.datePickerStart = (data.event.event.start_date) ? new Date(data.event.event.start_date) : ""
          this.datePickerEnd = (data.event.event.end_date) ? new Date(data.event.event.end_date) : ""
        },
        complete: () => this.spinner.hide()
      });
    } else {
      forkJoin({
        category: this.categoryService.getAll(),
        swoogo: this.eventSwoogoService.getAll(),
      }).subscribe({
        next: (data: any) => {
          console.log(data);
          this.categories = data.category.data;
          this.eventsSwoogo = data.swoogo.data;
        },
        complete: () => this.spinner.hide()
      });
    }
  }

  ngOnInit(): void {
    
  }

  save(form:NgForm){
    if(this.datePickerStart){
      this.form.start_date=this.datePickerStart.getFullYear()+'-'+(parseInt(this.datePickerStart.getMonth()) + 1) +'-'+this.datePickerStart.getDate();
    }
    if(this.datePickerEnd){
      this.form.end_date=this.datePickerEnd.getFullYear()+'-'+(parseInt(this.datePickerEnd.getMonth()) + 1) +'-'+this.datePickerEnd.getDate();
    }
    this.spinner.show();
    this.eventService.save(this.form).subscribe(
      (data:any) => {
        this._snackBar.open('Registro creado','Aceptar', { duration: 3000 });
         this.router.navigate(['/admin/events']);
      },
      (error) => this._msgErrors.show(error)
    );
  }

  onSelectEvent(){
    let selectedEvent = this.eventsSwoogo.find((e: { id: string; }) => e.id == this.form.eventSwoogo);
    this.form.name = selectedEvent.name;
    if(selectedEvent.url)
      this.form.url = selectedEvent.domain+'/'+selectedEvent.url;
    if(selectedEvent.start_date)
      this.datePickerStart = new Date(selectedEvent.start_date);
    if(selectedEvent.start_time)
      this.form.start_time = selectedEvent.start_time;
    if(selectedEvent.end_date)
      this.datePickerEnd = new Date(selectedEvent.end_date);
    if(selectedEvent.end_time)
      this.form.end_time = selectedEvent.end_time;
  }
}
