import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router, ActivatedRoute} from '@angular/router';
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
  public id:any;
  public data:any;
  public sdkString='';
  public registrantsData:any;
  public transactions:any;
  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/integraciones',title:'Integraciones'},
    {url:'',title:''}
  ];

  constructor(private spinner: NgxSpinnerService,
    private router: Router,
    public events: EventsService,
    public registrants: RegistrantsService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public integration: IntegrationService
    ) {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.getData();
  }

  async getData(){
    this.spinner.show();
    const integration:any = await lastValueFrom(this.integration.getOne(this.id));
    const transactions:any = await lastValueFrom(this.integration.getTransactions(this.id));
    this.data=integration.integration;
    this.data.transactions=transactions.data;
    //let sdkString=`const widgetId="38609517",integration_id="##INTEGRATION_ID##",gateway="${environment.baseBEUrl}/";var intervalId,count=0,transaction_id="";function isFormOK(){let t=!0;return $("#registrant-form :input").each(function(a,n){if("true"==$(n).attr("aria-invalid")){t=!1;return}}),t}var makeJsonFromTable=function(t){var a=jQuery(t),n=jQuery(a).find("thead"),e=jQuery(a).find("tbody"),i=jQuery(a).find("tbody>tr").length,r=[],o=[];jQuery.each(jQuery(n).find("tr>th"),function(t,a){r.push(jQuery(a).text())}),jQuery.each(jQuery(e).find("tr"),function(t,a){for(var n={},e=0;e<r.length-1;e++)n[r[e]]=jQuery(this).find("td").eq(e).text();o.push(n)});var c={};return c.count=i,c.value=o,o};const createOrder=async()=>{let t=makeJsonFromTable("#w_"+widgetId+' table[aria-labelledby="w_'+widgetId+'_label"]');return jQuery.ajax({url:gateway+"api/payments/create-order",type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify({integration_id,items:t}),crossDomain:!0})},check=async()=>jQuery.ajax({url:gateway+"api/transactions/check",type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify({transaction_id}),crossDomain:!0}),payment=async()=>{try{let t=await createOrder();transaction_id=t.data.metadata.transaction.id,window.open(t.data.init_point),intervalId=window.setInterval(function(){checkPay()},3e3)}catch(a){console.log(a)}},checkoutReturn=t=>{console.log(t)},checkPay=async()=>{let t=await check();!0==t.result&&(clearInterval(intervalId),transaction_id=intervalId,$("#registrant-form").submit())};jQuery(function(){$("#registrant-form").submit(function(t){return!!transaction_id||(t.preventDefault(),setTimeout(function(){if(0==count&&isFormOK()){count++;let t=$('#registrant-form button[type="submit"]');t.attr("disabled",!0),t.find("span").html("Esperando pago..."),payment()}else if(""!=transaction_id)return!0},500),!1)})});`
    let sdkString=`const widgetId="38609517",integration_id="##INTEGRATION_ID##",gateway="${environment.baseBEUrl}/",socket=io(),registrantForm="#registrant-form";var intervalId,count=0,transaction_id="";function isFormOK(){let t=!0;return $(registrantForm+" :input").each(function(a,n){if("true"==$(n).attr("aria-invalid")){t=!1;return}}),t}var makeJsonFromTable=function(t){var a=jQuery(t),n=jQuery(a).find("thead"),e=jQuery(a).find("tbody"),r=jQuery(a).find("tbody>tr").length,i=[],o=[];jQuery.each(jQuery(n).find("tr>th"),function(t,a){i.push(jQuery(a).text())}),jQuery.each(jQuery(e).find("tr"),function(t,a){for(var n={},e=0;e<i.length-1;e++)n[i[e]]=jQuery(this).find("td").eq(e).text();o.push(n)});var c={};return c.count=r,c.value=o,o};const createOrder=async()=>{let t=makeJsonFromTable("#w_"+widgetId+' table[aria-labelledby="w_'+widgetId+'_label"]');return jQuery.ajax({url:gateway+"api/payments/create-order",type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify({integration_id,items:t}),crossDomain:!0})},check=async()=>jQuery.ajax({url:gateway+"api/transactions/check",type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify({transaction_id}),crossDomain:!0}),payment=async t=>{try{let a=await createOrder();console.log(a.data),transaction_id=a.data.metadata.transaction.id,t.find("span").html(a.data.metadata.labels.btnSubmit),window.open(a.data.init_point)}catch(n){console.log(n)}},checkoutReturn=t=>{console.log(t)};jQuery(function(){$(registrantForm).submit(function(t){return!!transaction_id||(t.preventDefault(),setTimeout(function(){if(0==count&&isFormOK()){count++;let t=$(registrantForm+' button[type="submit"]');t.attr("disabled",!0),payment(t)}else if(""!=transaction_id)return!0},500),!1)})}),socket.on("message",t=>{t.transaction_id==transaction_id&&("themify.58ecddba064e63f7"==t.action?$(registrantForm).submit():processError(t))});const processError=t=>{console.log(t)};`
    this.sdkString = sdkString.replace(new RegExp("\\##INTEGRATION_ID##","gm"),this.id);
    
    this.breadcrumbs[2].title=this.data.id; 
    // this.registrantsData = await lastValueFrom(this.registrants.getAll(this.data.event_id));
    
    this.spinner.hide();
  }

  ngOnDestroy(){
    
  }
}
