import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IntegrationService } from 'src/app/services/api/integration.service';
import { EventsService } from 'src/app/services/events.service';
import Swal from 'sweetalert2';

import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html'
})

export class IntegrationComponent implements OnInit {
  public data:any={ };
  public query:string='';
  public breadcrumbs=[{url:'/home',title:'Inicio'},{url:'',title:'Integrations'}];

  constructor(
    private spinner: NgxSpinnerService,
    public integrationService: IntegrationService,
    public events: EventsService,
    private _snackBar: MatSnackBar
  ) { 
    this.events.subscribe('pagination', (data: any) => {
      this.integrationService.calcOffset(data.currentPage);
      this.getResult();
    });
    this.events.subscribe('order', () => this.getResult());
  }

  ngOnInit(): void {
    this.getResult();
  }

  ngOnDestroy(){
    this.events.destroy('pagination');
    this.events.destroy('order');
  }

  search(){
    this.events.publish('paginationOffset', {});
    this.integrationService.offset=0;
    this.getResult();
  }

  getResult(){
    this.spinner.show();
    this.integrationService.get(this.query).subscribe(
      (data:any) => { this.data=data; 
      },
      (error) => this.spinner.hide(),
      () => this.spinner.hide()
    );
  }
  
  remove(index:number){
    Swal.fire({
      text: '¿Está seguro que desea eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.integrationService.delete(this.data.data[index]).subscribe(()=>this.getResult());
        this._snackBar.open('Registro eliminado','Aceptar', { duration: 3000 });
      }
    });
  }
  
}
