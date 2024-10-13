import {Component} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {TaskListSheetComponent} from "@app/components/task-list-sheet/task-list-sheet.component";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  constructor(private bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this.bottomSheet.open(TaskListSheetComponent);
  }
}
