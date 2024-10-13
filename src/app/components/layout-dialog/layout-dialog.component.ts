import {Component, Inject} from '@angular/core';
import {Bed, Layout, Row, Section} from "@app/api/layout";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface LayoutDialogData {
  layout: Layout;
}

@Component({
  selector: 'app-layout-dialog',
  templateUrl: './layout-dialog.component.html',
  styleUrls: ['./layout-dialog.component.scss']
})
export class LayoutDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LayoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LayoutDialogData,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  addBed(): void {
    this.data.layout.beds.push({
      rows: [],
    } as unknown as Bed)
  }

  addRow(bed: Bed) {
    bed.rows.push({
      sections: []
    } as unknown as Row)
  }

  addSection(row: Row) {
    row.sections.push({
    } as Section)
  }
}
