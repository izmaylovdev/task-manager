import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { iBoard } from './interfaces/iBoard';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from './components/dialog/dialog.component';

import 'rxjs/add/operator/filter';
import { DialogService } from './services/dialog.service';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

@Component({
  selector: 'tm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  boards: iBoard[];
  constructor(private dataService: DataService, private dialogService: DialogService) {
  }

  ngOnInit () {
    this.dataService.getData()
      .subscribe(boards => {
        this.boards = boards;
        console.log(boards);
      });
  }

  addBoard () {
    this.dialogService.openDialog(DialogComponent, { title: 'Board creation', placeholder: 'Board name' })
      .filter(boardName => boardName)
      .subscribe(boardName => {
        const board = { name: boardName, tasks: [] };
        this.dataService.addBoard(board)
          .subscribe(res => {
            this.boards.push(board);
          });
      });
  }

  signUp () {
    this.dialogService.openDialog(LoginDialogComponent, { title: 'Sign up' })
      .filter(data => data)
      .subscribe(userData => {
        this.dataService.signUp(userData)
          .subscribe(res => {
            this.boards = res;
          });
      });
  }

  signIn () {
    this.dialogService.openDialog(LoginDialogComponent, { title: 'Sign in' })
      .filter(data => data)
      .subscribe(userData => {
        this.dataService.signIn(userData)
          .subscribe(res => {
            this.boards = res;
          });
      });
  }

}
