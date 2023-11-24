import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DemoComponent } from './pages/demo/demo.component';
import { DemoFormComponent } from './pages/demo/demo-form/demo-form.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { IntegrationComponent } from './pages/integration/integration.component';
import { IntegrationFormComponent } from './pages/integration/integration-form/integration-form.component';
import { IntegrationDetailComponent } from './pages/integration/integration-detail/integration-detail.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  
  { path: 'demos', component: DemoComponent,canActivate:[AuthGuard]},
  { path: 'demos/nuevo', component: DemoFormComponent ,canActivate:[AuthGuard]},
  { path: 'demos/editar/:id', component: DemoFormComponent ,canActivate:[AuthGuard]},
  
  { path: 'usuarios', component: UsersComponent,canActivate:[AuthGuard]},
  { path: 'usuarios/nuevo', component: UsersFormComponent ,canActivate:[AuthGuard]},
  { path: 'usuarios/editar/:id', component: UsersFormComponent ,canActivate:[AuthGuard]},
  
  { path: 'integraciones', component: IntegrationComponent,canActivate:[AuthGuard]},
  { path: 'integraciones/nuevo', component: IntegrationFormComponent ,canActivate:[AuthGuard]},
  { path: 'integraciones/:id', component: IntegrationDetailComponent ,canActivate:[AuthGuard]},
  { path: 'integraciones/editar/:id', component: IntegrationFormComponent ,canActivate:[AuthGuard]},
  
  { path: '', pathMatch:'full', component: HomeComponent,canActivate:[AuthGuard]},
  { path: '**', pathMatch:'full', component: HomeComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
