import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IntegrationService } from 'src/app/services/api/integration.service';
import { EventsService } from 'src/app/services/events.service';
import { lastValueFrom } from 'rxjs';
import { RegistrantsService } from 'src/app/services/api/registrant.service';
import { environment } from "src/environments/environment";
import { SessionSwoogoService } from 'src/app/services/api/sessionSwoogo.service';


@Component({
	selector: 'app-integration-detail',
	templateUrl: './integration-detail.component.html',
	styleUrls: []
})
export class IntegrationDetailComponent implements OnInit {
	public id: any;
	public data: any;
	public sdkString = '';
	public registrantsData: any;
	public transactions: any;
	public sessions: any;
	public webChecking = '';
	public breadcrumbs = [
		{ url: '/admin/inicio', title: 'Inicio' },
		{ url: '/admin/integraciones', title: 'Integraciones' },
		{ url: '', title: '' }
	];

	constructor(private spinner: NgxSpinnerService,

		private router: Router,
		public events: EventsService,
		public registrants: RegistrantsService,
		private _snackBar: MatSnackBar,
		private activatedRoute: ActivatedRoute,
		public integration: IntegrationService,
		public session: SessionSwoogoService,
	) {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
	}

	ngOnInit(): void {
		this.getData();
	}

	async getData() {
		this.spinner.show();
		const integration: any = await lastValueFrom(this.integration.getOne(this.id));
		const transactions: any = await lastValueFrom(this.integration.getTransactions(this.id));
		this.data = integration.integration;
		this.data.transactions = transactions.data;
		switch (this.data.type) {
			case 'MERCADOPAGO':
				let sdkString = '';
				sdkString = `<script type="text/javascript" src="https://clickgroup-be.latamhosting.com.ar/swoogo-integration.1.0.0.js"></script>    
						<script>
						const integration_id="##INTEGRATION_ID##";
						const gateway="${environment.baseBEUrl}/";
						const registrantForm="#registrant-form"; 
						const mode="prod";
						jQuery(function(){captureForm()});</script>`
				this.sdkString = sdkString.replace(new RegExp("\\##INTEGRATION_ID##", "gm"), this.id);
				break;
			case 'WEBSERVICE':
				this.sdkString = `https://documenter.getpostman.com/view/8526806/2s9Yyy8e8L`
				break;
			case 'CHECKIN':
				const sessions: any = await lastValueFrom(this.session.getAll(parseInt(integration.integration.event_id)));
				this.sessions = sessions.data;
				this.webChecking = environment.webChecking;
				
				break;
		}
		this.breadcrumbs[2].title = this.data.id;
		this.spinner.hide();
	}
}
