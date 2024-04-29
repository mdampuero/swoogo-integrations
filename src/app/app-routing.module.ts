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
import { FeHomeComponent } from './pages/feHome/feHome.component';
import { EventComponent } from './pages/event/event.component';
import { EventFormComponent } from './pages/event/event-form/event-form.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryFormComponent } from './pages/category/category-form/category-form.component';
import { SettingComponent } from './pages/setting/setting.component';

const routes: Routes = [
  { path: 'admin/login', component: LoginComponent},
  { path: 'admin/inicio', component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'admin', component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'admin/setting', component: SettingComponent,canActivate:[AuthGuard]},

  { path: 'admin/demos', component: DemoComponent,canActivate:[AuthGuard]},
  { path: 'admin/demos/nuevo', component: DemoFormComponent ,canActivate:[AuthGuard]},
  { path: 'admin/demos/editar/:id', component: DemoFormComponent ,canActivate:[AuthGuard]},
  
  { path: 'admin/events', component: EventComponent,canActivate:[AuthGuard]},
  { path: 'admin/events/nuevo', component: EventFormComponent ,canActivate:[AuthGuard]},
  { path: 'admin/events/editar/:id', component: EventFormComponent ,canActivate:[AuthGuard]},
  
  { path: 'admin/categories', component: CategoryComponent,canActivate:[AuthGuard]},
  { path: 'admin/categories/nuevo', component: CategoryFormComponent ,canActivate:[AuthGuard]},
  { path: 'admin/categories/editar/:id', component: CategoryFormComponent ,canActivate:[AuthGuard]},
  
  { path: 'admin/usuarios', component: UsersComponent,canActivate:[AuthGuard]},
  { path: 'admin/usuarios/nuevo', component: UsersFormComponent ,canActivate:[AuthGuard]},
  { path: 'admin/usuarios/editar/:id', component: UsersFormComponent ,canActivate:[AuthGuard]},
  
  { path: 'admin/integraciones', component: IntegrationComponent,canActivate:[AuthGuard]},
  { path: 'admin/integraciones/nuevo', component: IntegrationFormComponent ,canActivate:[AuthGuard]},
  { path: 'admin/integraciones/:id', component: IntegrationDetailComponent ,canActivate:[AuthGuard]},
  { path: 'admin/integraciones/editar/:id', component: IntegrationFormComponent ,canActivate:[AuthGuard]},
  
  { path: '', pathMatch:'full', component: HomeComponent,canActivate:[AuthGuard]},
  { path: '**', pathMatch:'full', component: HomeComponent,canActivate:[AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
