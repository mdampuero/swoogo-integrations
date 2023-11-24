import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IntegrationService } from 'src/app/services/api/integration.service';
import { EventsService } from 'src/app/services/events.service';
import { lastValueFrom } from 'rxjs';
import { RegistrantsService } from 'src/app/services/api/registrant.service';
import { environment } from "src/environments/environment";


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
  public breadcrumbs = [
    { url: '/inicio', title: 'Inicio' },
    { url: '/integraciones', title: 'Integraciones' },
    { url: '', title: '' }
  ];

  constructor(private spinner: NgxSpinnerService,

    private router: Router,
    public events: EventsService,
    public registrants: RegistrantsService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public integration: IntegrationService
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
    // let sdkString = `const widgetId="38609517",integration_id="##INTEGRATION_ID##",gateway="${environment.baseBEUrl}/",mode="sandbox";jQuery(function(){captureForm()});`
    let sdkString = `<script type="text/javascript" src="https://swoogo-integrations-be-production.up.railway.app/swoogo-integration.1.0.0.js"></script>
    
    <script>
    const integration_id="##INTEGRATION_ID##";
    const gateway="${environment.baseBEUrl}/";
    const registrantForm="#registrant-form"; 
    const mode="prod";
    jQuery(function(){captureForm()});<script>`
    
    this.sdkString = sdkString.replace(new RegExp("\\##INTEGRATION_ID##", "gm"), this.id);
    this.breadcrumbs[2].title = this.data.id;
    this.spinner.hide();
  }
}
