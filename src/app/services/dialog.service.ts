import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(component, data): Observable<any> {
    const dialogRef = this.dialog.open(component, {
      width: '260px',
      data
    });

    return dialogRef.afterClosed();
  }
}
