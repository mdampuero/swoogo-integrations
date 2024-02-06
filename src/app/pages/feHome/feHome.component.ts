import { Component, OnInit } from '@angular/core';
import { IntegrationService } from 'src/app/services/api/integration.service';
import { TransactionService } from 'src/app/services/api/transaction.service';
import { UsersService } from 'src/app/services/api/users.service';
// import { OrdersService } from 'src/app/services/api/orders.service';
// import { SinistersService } from 'src/app/services/api/sinisters.service';
// import { StatsService } from 'src/app/services/api/stats.service';

@Component({
  selector: 'app-home',
  templateUrl: './feHome.component.html'
})
export class FeHomeComponent implements OnInit {
  public integrationStats:any;
  public userStats:any;
  public transactionStats:any;
  constructor(
     public integration:IntegrationService, 
     public user:UsersService,
     public transaction:TransactionService 
    ) {}

  ngOnInit(): void {
    
  }

}
