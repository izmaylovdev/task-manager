import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'tm-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isLogined: boolean;
  @Input() onNewBoards: Function;
  constructor(private dataService: DataService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.dataService.authChange.subscribe(state => {
      this.isLogined = state;
    });
  }

  signUp() {
    this.dialogService.openDialog(LoginDialogComponent, { title: 'Sign up' })
      .filter(data => data)
      .subscribe(userData => {
        this.dataService.signUp(userData)
          .subscribe(res => this.onNewBoards(res));
      });
  }

  signIn() {
    this.dialogService.openDialog(LoginDialogComponent, { title: 'Sign in' })
      .filter(data => data)
      .subscribe(userData => {
        this.dataService.signIn(userData)
          .subscribe(res => this.onNewBoards(res));
      });
  }

  logout () {
    console.log('logout');
    this.dataService.logout()
      .subscribe(res => {
        this.isLogined = false;
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
      });
  }
}
