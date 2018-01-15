import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { iBoard } from './interfaces/iBoard';

@Component({
  selector: 'tm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  boards: iBoard[];
  constructor (private dataService: DataService) {
  }

  ngOnInit () {
    this.dataService.getData()
      .subscribe(boards => {
        this.boards = boards;
      });
  }
}
