import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgFor } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

//components
import { HeaderComponent } from './src/app/components/header/header.component';
import { AboutComponent } from './src/app/components/about/about.component';
import { Comp1Component } from './src/app/components/comp1/comp1.component';
import { Comp2Component } from './src/app/components/comp2/comp2.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    Comp1Component,
    Comp2Component,
  ],
  imports: [
    NgFor,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbAlertModule,
    NgbCollapseModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
