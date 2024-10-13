import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SectionState} from "@app/api/garden";
import {Plant} from "@app/api/plant";

export interface SectionHistoryDialogData {
  plants: Plant[]
  sectionState: SectionState
}

@Component({
  selector: 'app-section-history-dialog',
  templateUrl: './section-history-dialog.component.html',
  styleUrls: ['./section-history-dialog.component.scss']
})
export class SectionHistoryDialogComponent {
  columns: string[] = ['plant', 'timestamp']

  constructor(
    public dialogRef: MatDialogRef<SectionHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SectionHistoryDialogData,
  ) {
  }

  getPlantById(plantId: string) {
    return this.data.plants.find(plant => plant.id === plantId)
  }

  onCloseClick() {
    this.dialogRef.close()
  }
}
