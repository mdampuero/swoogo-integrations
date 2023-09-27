import { Component, OnInit } from '@angular/core';
import { IntegrationService } from 'src/app/services/api/integration.service';
import { TransactionService } from 'src/app/services/api/transaction.service';
import { UsersService } from 'src/app/services/api/users.service';
// import { OrdersService } from 'src/app/services/api/orders.service';
// import { SinistersService } from 'src/app/services/api/sinisters.service';
// import { StatsService } from 'src/app/services/api/stats.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public integrationStats:any;
  public userStats:any;
  public transactionStats:any;
  constructor(
     public integration:IntegrationService, 
     public user:UsersService,
     public transaction:TransactionService 
    ) {}

  ngOnInit(): void {
    this.integration.stats().subscribe((data:any) => this.integrationStats=data);
    this.user.stats().subscribe((data:any) => this.userStats=data);
    this.transaction.stats().subscribe((data:any) => this.transactionStats=data);
  }

}
