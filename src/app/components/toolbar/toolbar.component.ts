import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

import 'rxjs/add/operator/mergeMap';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'tm-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isLogined: boolean;
  @Input() onNewBoards: Function;
  constructor(private dataService: DataService,
              private dialogService: DialogService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataService.authChange.subscribe(state => {
      this.isLogined = state;
    });
  }

  signUp() {
    this.dialogService.openDialog(LoginDialogComponent, { title: 'Sign up' })
      .filter(data => data)
      .mergeMap(data => this.dataService.signUp(data))
      .subscribe(
        res => {
            this.onNewBoards(res);
            this.snackBar.open(`Task created!`, 'Ok', { duration: 1000 });
        },
        err => {
          this.snackBar.open(err.error.message, 'Ok', { duration: 1000 });
        }
      );
  }

  signIn() {
    this.dialogService.openDialog(LoginDialogComponent, { title: 'Sign in' })
      .filter(data => data)
      .subscribe(userData => {
        this.dataService.signIn(userData)
          .subscribe(
            res => this.onNewBoards(res),
            err => this.snackBar.open(err.error.message, 'Ok', { duration: 1000 })
          );
      });
  }

  logout () {
    this.dataService.logout();
    this.onNewBoards([{
      title: 'To do',
      tasks: [
        {
          title: 'Login',
          description: 'Sign up or sign in to this app',
          dueDate: null
        }
      ]
    }]);
  }
}
