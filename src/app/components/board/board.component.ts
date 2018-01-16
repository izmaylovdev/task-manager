import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tm-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board;

  constructor() { }

  ngOnInit() {
  }

  onDrag (event) {
    console.log(event);
  }
}
