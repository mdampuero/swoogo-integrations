import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './components/test/test.component';
import { DemoComponent } from './pages/demo/demo.component';
import { DemoFormComponent } from './pages/demo/demo-form/demo-form.component';
import { EventComponent } from './pages/event/event.component';
import { IntegrationComponent } from './pages/integration/integration.component';
import { FormsModule } from '@angular/forms';
import { EventFormComponent } from './pages/event/event-form/event-form.component';
import { IntegrationFormComponent } from './pages/integration/integration-form/integration-form.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './pages/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableThComponent } from './components/table-th/table-th.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CountResultsComponent } from './components/count-results/count-results.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FormatNumberPipe } from './pipes/format-number.pipe';
import { IntegrationDetailComponent } from './pages/integration/integration-detail/integration-detail.component';
import { BadgeStatusPipe } from './pipes/badge-status.pipe';
import { HomeComponent } from './pages/home/home.component';
import { FeHomeComponent } from './pages/feHome/feHome.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BadgeBinaryPipe } from './pipes/badge-binary.pipe';
import { BtnCopyComponent } from './components/btn-copy/btn-copy.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryFormComponent } from './pages/category/category-form/category-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BreadcrumbComponent,
    TestComponent,
    DemoComponent,
    EventComponent,
    HomeComponent,
    FeHomeComponent,
    IntegrationComponent,
    IntegrationFormComponent,
    IntegrationDetailComponent,
    TableThComponent,
    DemoFormComponent,
    EventFormComponent,
    
    LoginComponent,
    PaginationComponent,
    CountResultsComponent,
    TruncatePipe,
    FormatNumberPipe,
    BadgeStatusPipe,
    BadgeBinaryPipe,
    UsersComponent,
    UsersFormComponent,
    BtnCopyComponent,
    // TranslatePipe,
    CategoryComponent,
    CategoryFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSnackBarModule,
    ToastrModule.forRoot({

    }),
    NgxSpinnerModule.forRoot(),
    MatDatepickerModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatNativeDateModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
