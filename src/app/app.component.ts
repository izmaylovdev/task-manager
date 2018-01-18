import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

import 'rxjs/add/operator/filter';
import { DialogService } from './services/dialog.service';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'tm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private boardsSubject = new Subject();
  newBoards = this.boardsSubject.asObservable();
  onNewBoards = this.boardsSubject.next.bind(this.boardsSubject);

  constructor () {}

  ngOnInit () {}

}
