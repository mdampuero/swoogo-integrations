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
  
  { path: 'demos', component: DemoComponent},
  { path: 'demos/nuevo', component: DemoFormComponent },
  { path: 'demos/editar/:id', component: DemoFormComponent },
  
  { path: 'usuarios', component: UsersComponent},
  { path: 'usuarios/nuevo', component: UsersFormComponent },
  { path: 'usuarios/editar/:id', component: UsersFormComponent },
  
  { path: 'integraciones', component: IntegrationComponent},
  { path: 'integraciones/nuevo', component: IntegrationFormComponent },
  { path: 'integraciones/:id', component: IntegrationDetailComponent },
  { path: 'integraciones/editar/:id', component: IntegrationFormComponent },
  
  { path: '', pathMatch:'full', component: HomeComponent},
  { path: '**', pathMatch:'full', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
