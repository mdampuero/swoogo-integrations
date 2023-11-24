import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { msgErrors } from 'src/app/services/msgErrors.service';
// import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { IntegrationService } from 'src/app/services/api/integration.service';
import { Integration } from 'src/app/models/integration.model';
import { EventService } from 'src/app/services/api/event.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-integration-form',
  templateUrl: './integration-form.component.html'
})
export class IntegrationFormComponent implements OnInit {
  public form: Integration = {
    id: '',
    type: '',
    description: '',
    event_id: '',
    event: {},
    // item_title: '',
    item_currency: '',
    access_token: '',
    // item_price: 1,
    isActive: 1
  };
  public events: any;
  public types: any = [{
    value: 'MERCADOPAGO',
    label: 'Mercado Pago'
  }]
  public currencies: any = [
    {
      value: 'CLP',
      label: 'Pesos chilenos'
    },
    {
      value: 'ARS',
      label: 'Pesos argentinos'
    }
  ]
  public titlePage: string = 'Nuevo';

  public breadcrumbs = [
    { url: '/inicio', title: 'Inicio' },
    { url: '/integraciones', title: 'Integrations' },
    { url: '', title: 'Nuevo' }
  ];

  constructor(
    private _msgErrors: msgErrors,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public integrationService: IntegrationService,
    public eventService: EventService,
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
        events: this.eventService.getAll(),
        integration: this.integrationService.getOne(id)
      }).subscribe({
        next: (data: any) => {
          this.form = data.integration.integration;
          this.events = data.events.data;
          this.form.isActive = (data.integration.integration.isActive) ? 1 : 0
        },
        complete: () => this.spinner.hide()
      });
    } else {
      this.eventService.getAll().subscribe({
        next: (data: any) => this.events = data.data,
        complete: () => this.spinner.hide()
      });
    }
  }


  ngOnInit(): void {

  }

  save(form: NgForm) {
    this.spinner.show();
    this.form.event = this.events.find((e: { id: string; }) => e.id == this.form.event_id);
    this.integrationService.save(this.form).subscribe(
      (data: any) => {
        this._snackBar.open('Registro creado', 'Aceptar', { duration: 3000 });
        this.router.navigate(['/integraciones']);
      },
      (error) => this._msgErrors.show(error)
    );
  }

}
