import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export type SectionGroupDialogData = object;

@Component({
  selector: 'app-section-group-dialog',
  templateUrl: './section-group-dialog.component.html',
  styleUrls: ['./section-group-dialog.component.scss']
})
export class SectionGroupDialogComponent {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SectionGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SectionGroupDialogData,
  ) {
  }

  sectionGroupForm = this.fb.group({
    name: new FormControl('', [Validators.required]),
    colour: new FormControl('', [Validators.required]),
  })

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick() {
    this.dialogRef.close(this.sectionGroupForm.value);
  }
}
