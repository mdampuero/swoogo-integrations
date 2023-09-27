import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router, ActivatedRoute} from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { IntegrationService } from 'src/app/services/api/integration.service';
import { Integration } from 'src/app/models/integration.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-integration-detail',
  templateUrl: './integration-detail.component.html',
  styleUrls: []
})
export class IntegrationDetailComponent implements OnInit {
  public id:any;
  public data:any;
  public transactions:any;
  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/integraciones',title:'Integraciones'},
    {url:'',title:''}
  ];

  constructor(private spinner: NgxSpinnerService,
    private router: Router,
    public events: EventsService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public integration: IntegrationService) {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.spinner.show();
    this.integration.getOne(this.id).subscribe(
      (data:any) => {
        this.data=data.integration;
        this.breadcrumbs[2].title=this.data.id;        
      },
      (error) => this.spinner.hide(),
      () => this.spinner.hide()
    );
  }

  ngOnDestroy(){
    
  }
}
