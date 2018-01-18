import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';
import { iBoard } from '../../interfaces/iBoard';
import { Observable } from 'rxjs/Observable';
import { EditBoardDialogComponent } from '../edit-board-dialog/edit-board-dialog.component';
import { DragulaService } from 'ng2-dragula';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'tm-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boards: iBoard[];
  isLogined;
  @Input() newBoards: Observable<iBoard[]>;

  constructor(private dataService: DataService,
              private dialogService: DialogService,
              private dragulaService: DragulaService,
              public snackBar: MatSnackBar) {
    this.boards = [];
  }

  ngOnInit() {
    this.dataService.authChange.subscribe(state => {
      this.isLogined = state;
    });

    this.dataService.getBoards()
      .subscribe(boards => {
        this.boards = boards;
      });
    this.newBoards.subscribe(boards => this.boards = boards);

    this.dragulaService.dropModel
      .map(arr => ({ taskId: arr[1].id, destId: arr[2].id, fromId: arr[3].id }))
      .filter(obj => obj.destId !== obj.fromId)
      .mergeMap(obj => this.dataService.moveTask(obj))
      .subscribe(obj => console.log(obj));
  }

  addBoard() {
    const dialogConfig = {
      title: 'Board creation',
      deleteEnabled: false,
      board: null
    };

    this.dialogService.openDialog(EditBoardDialogComponent, dialogConfig)
      .map(({title}) => title)
      .filter(title => title)
      .subscribe(title => {
        const board = { title, tasks: [] };
        this.dataService.addBoard(board)
          .subscribe(newBoard => {
            this.boards.push(newBoard);
            this.snackBar.open(`Board "${newBoard.title}" created!`, 'Ok', { duration: 2000 });
          });
      });
  }

  deleteBoard (board) {
    this.dataService.deleteBoard(board._id)
      .subscribe(data => {
        const index = this.boards.indexOf(board);
        this.boards.splice(index, 1);
        this.snackBar.open(`Board "${board.title}" deleted!`, 'Ok', { duration: 2000 });
      });
  }

}
