import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

import { DataService } from './services/data.service';
import { InMemoryDataService } from './services/in-memory-data.service';
import { DialogService } from './services/dialog.service';

import { DragulaModule } from 'ng2-dragula';

import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule
} from '@angular/material';
import { BoardsComponent } from './components/boards/boards.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { EditTaskDialogComponent } from './components/edit-task-dialog/edit-task-dialog.component';
import { EditBoardDialogComponent } from './components/edit-board-dialog/edit-board-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    LoginDialogComponent,
    BoardsComponent,
    ToolbarComponent,
    EditTaskDialogComponent,
    EditBoardDialogComponent
  ],
  entryComponents: [
    LoginDialogComponent,
    EditTaskDialogComponent,
    EditBoardDialogComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSnackBarModule,
    MatDatepickerModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatNativeDateModule,
    FormsModule
  ],
  providers: [ DataService, DialogService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
