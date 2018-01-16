import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { BoardComponent } from './components/board/board.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

import { DataService } from './services/data.service';
import { InMemoryDataService } from './services/in-memory-data.service';
import { DialogService } from './services/dialog.service';

import { DndModule } from 'ng2-dnd';


import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    DialogComponent,
    LoginDialogComponent
  ],
  entryComponents: [
    DialogComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTooltipModule,
    FormsModule,
    DndModule.forRoot(),
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [ DataService, DialogService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
