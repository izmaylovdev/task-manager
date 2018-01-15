import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { BoardComponent } from './components/board/board.component';

import { AppComponent } from './app.component';

import { DataService } from './services/data.service';
import { InMemoryDataService } from './services/in-memory-data.service';

import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
