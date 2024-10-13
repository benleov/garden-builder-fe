import {Component, Inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SectionGroup} from "@app/api/garden";

export interface SectionGroupSelectDialogData {
  groups: SectionGroup[], // all groups for this garden
  sectionId: string  // section we are editing
  groupId: string // selected group for this section
}

/**
 * Edit a section group; adding or removing this section from the group.
 *
 * [Group Select]
 *
 * -> save -> update existing group (against garden) and add this section
 */
@Component({
  selector: 'app-section-group-select-dialog',
  templateUrl: './section-group-select-dialog.component.html',
  styleUrls: ['./section-group-select-dialog.component.scss']
})
export class SectionGroupSelectDialogComponent {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SectionGroupSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SectionGroupSelectDialogData,
  ) {
  }

  sectionGroupForm = this.fb.group({
    groupId: this.fb.control(this.data.groupId),
  })


  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick() {
    this.dialogRef.close({
      ...this.sectionGroupForm.value,
      sectionId: this.data.sectionId
    });
  }

  onDeleteClick() {
    console.log('TODO')
  }
}
