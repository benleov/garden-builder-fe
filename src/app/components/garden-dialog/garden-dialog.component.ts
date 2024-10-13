import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Garden} from "@app/api/garden";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Layout} from "@app/api/layout";

export interface GardenDialogData {
  garden: Garden;
  layouts: Layout[],
  selectedLayoutId: string,
}

@Component({
  selector: 'app-garden-dialog',
  templateUrl: './garden-dialog.component.html',
  styleUrls: ['./garden-dialog.component.scss']
})
export class GardenDialogComponent {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GardenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GardenDialogData,
  ) {
  }

  gardenForm = this.fb.group({
    year: new FormControl('', [Validators.required]),
    season: new FormControl('', [Validators.required]),
    layoutId: new FormControl(this.data.selectedLayoutId, [Validators.required]),
  })

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick() {
    this.dialogRef.close(this.gardenForm.value);
  }
}
