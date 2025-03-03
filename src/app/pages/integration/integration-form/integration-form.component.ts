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
import { EventSwoogoService } from 'src/app/services/api/eventSwoogo.service';
import { forkJoin } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { EventsService } from 'src/app/services/events.service';
@Component({
	selector: 'app-integration-form',
	templateUrl: './integration-form.component.html'
})
export class IntegrationFormComponent implements OnInit {
	public form: any = {
		id: '',
		type: '',
		description: '',
    pictureBackground: '',
		pictureBackgroundBase64: '',
		event_id: '',
		event: {},
		item_currency: '',
		access_token: '',
		isActive: 1,
		camaraEnabled: 1,
		request: 0,
    request_label: '',
    request_field: '',
    request_input_type: 'STRING',
    request_options: [],
		extraOption: 1,
		password: ''
	};

  public tmp: any = {
		pictureBackground: '',
		pictureCard: ''
	};

	public events: any;
	public types: any = [
		{
			value: 'MERCADOPAGO',
			label: 'Mercado Pago'
		},
		{
			value: 'WEBSERVICE',
			label: 'Web service'
		},
		{
			value: 'CHECKIN',
			label: 'Check In'
		}
	]
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
		{ url: '/admin/inicio', title: 'Inicio' },
		{ url: '/admin/integraciones', title: 'Integrations' },
		{ url: '', title: 'Nuevo' }
	];

	constructor(
    public event: EventsService,
		private _msgErrors: msgErrors,
		private spinner: NgxSpinnerService,
		private router: Router,
		private _snackBar: MatSnackBar,
		private activatedRoute: ActivatedRoute,
		public integrationService: IntegrationService,
		public eventService: EventSwoogoService,
		public utilsService: UtilsService
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
					this.form             = data.integration.integration;
					this.events           = data.events.data;
					this.form.isActive    = (data.integration.integration.isActive) ? 1   : 0;
					this.form.camaraEnabled    = (data.integration.integration.camaraEnabled) ? 1   : 0;
					this.form.extraOption = (data.integration.integration.extraOption) ? 1: 0;
					this.form.request     = (data.integration.integration.request) ? 1 : 0;
          this.tmp.pictureBackground = (data.integration.integration.pictureBackground) ? data.integration.integration.pictureBackground : "assets/images/default-banner.png"
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

	typeChange(event: any) {
		const selectedValue = event.target.value;
		switch (selectedValue) {
			case 'WEBSERVICE':
				this.generatePassword();
				break;
		}
	}

	generatePassword(){
		this.form.access_token = this.utilsService.generatePassword()
	}

	ngOnInit(): void {
    this.event.subscribe('app-input-file', (data: any) => {
			this.form[data.inputName] = data.base64;
			this.tmp[data.inputNamePreview] = data.base64;
		});
	}

  removeInput(index: number) {
    this.form.request_options.splice(index, 1);
  }

  trackByFn(index: number, item: any) {
    return index; // Usar el índice como identificador único
  }

  addOption(){
    this.form.request_options.push('');
  }

  removePictureBackground(defaultPicture: string) {
		this.form.pictureBackgroundBase64 = '##delete##';
		this.tmp.pictureBackground = defaultPicture;
	}

	save(form: NgForm) {
		this.spinner.show();
		this.form.event = this.events.find((e: { id: string; }) => e.id == this.form.event_id);
		this.integrationService.save(this.form).subscribe(
			(data: any) => {
				this._snackBar.open('Registro creado', 'Aceptar', { duration: 3000 });
				this.router.navigate(['/admin/integraciones']);
			},
			(error) => this._msgErrors.show(error)
		);
	}

}
