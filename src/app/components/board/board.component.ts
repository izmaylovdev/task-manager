import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { EditBoardDialogComponent } from '../edit-board-dialog/edit-board-dialog.component';
import { DataService } from '../../services/data.service';

import 'rxjs/add/operator/mergeMap';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'tm-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board;
  @Output() delete = new EventEmitter();
  isLogined: boolean;

  constructor(private dialogService: DialogService,
              private dataService: DataService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataService.authChange.subscribe(state => {
      this.isLogined = state;
    });
  }

  createTask () {
    const dialogConfig = {
      title: 'Task creation',
      task: null,
      deleteEnabled: false
    };

    this.dialogService.openDialog(EditTaskDialogComponent, dialogConfig)
      .filter(data => data.task || data.task.title)
      .subscribe(({task}) => {
        this.dataService.addTask(task, this.board._id)
          .subscribe(res => {
            this.board.tasks.push(task);
            this.snackBar.open(`Task created!`, 'Ok', { duration: 2000 });
          });
      });
  }

  editTask (task) {
    const dialogConfig = {
      title: 'Task edititon',
      deleteEnabled: true,
      task: Object.assign({}, task)
    };
    const dialog = this.dialogService.openDialog(EditTaskDialogComponent, dialogConfig);

    dialog
      .filter(res => res.action === 'change')
      .map(res => res.task)
      .mergeMap(newTask => this.dataService.editTask(newTask))
      .subscribe(newTask => {
        const index = this.board.tasks.indexOf(task);
        this.board.tasks.splice(index, 1, newTask);
        this.snackBar.open(`Task changed!`, 'Ok', { duration: 2000 });
      });

    dialog
      .filter(({ action }) => action === 'delete')
      .mergeMap(obj => this.dataService.deleteTask({ id: task._id , boardId: this.board._id }))
      .subscribe(newTask => {
        const index = this.board.tasks.indexOf(task);
        this.board.tasks.splice(index, 1);
        this.snackBar.open(`Task deleted!`, 'Ok', { duration: 2000 });
      });
  }


  editBoard(board) {
    const dialogConfig = {
      title: 'Board edititon',
      deleteEnabled: true,
      boardTitle: board.title
    };

    const dialog = this.dialogService.openDialog(EditBoardDialogComponent, dialogConfig);

    dialog.filter(({ action, title}) => action === 'change' && title)
      .mergeMap(({ title }) => this.dataService.editBoard({ title, id: board._id }))
      .map(data => data.title)
      .subscribe(title => {
        this.board.title = title;
        this.snackBar.open(`Board renamed!`, 'Ok', { duration: 2000 });
      });

    dialog.filter(({ action, title}) => action === 'delete')
      .subscribe(data => this.delete.emit(this.board));
  }
}
