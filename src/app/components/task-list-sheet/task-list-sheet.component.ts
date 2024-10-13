import {Component} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-task-list-sheet',
  templateUrl: './task-list-sheet.component.html',
  styleUrls: ['./task-list-sheet.component.scss']
})
export class TaskListSheetComponent {

  constructor(private _bottomSheetRef: MatBottomSheetRef<TaskListSheetComponent>) {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
