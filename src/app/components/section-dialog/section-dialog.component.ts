import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SectionSnapshot, SectionTreatment, TreatmentType} from "@app/api/garden";
import {Plant} from "@app/api/plant";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

export interface SectionDialogData {
  snapshot: SectionSnapshot;
  sectionId: string,
  sectionStateId: string,
  plants: Plant[];
  deleted: boolean;
  modifyGroup: boolean,
  isInGroup: boolean,
}

@Component({
  selector: 'app-section-dialog',
  templateUrl: './section-dialog.component.html',
  styleUrls: ['./section-dialog.component.scss']
})
export class SectionDialogComponent {

  allTreatmentTypes = Object.values(TreatmentType);
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ['treatmentType', 'treatmentTimestamp', 'treatmentDelete']

  constructor(
    public dialogRef: MatDialogRef<SectionDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: SectionDialogData,
  ) {
    this.data.snapshot?.sectionTreatments?.forEach(
      (treatment: SectionTreatment) => this.addTreatment(treatment, false));
    this.updateView();
  }

  sectionTreatments = this.fb.array([])

  sectionForm = this.fb.group({
    plantId: this.fb.control(this.data.snapshot.plantId, [Validators.required]),
    plantingTimestamp: this.fb.control(this.data.snapshot.plantingTimestamp, [Validators.required]),
    harvestedTimestamp: this.fb.control(this.data.snapshot.harvestedTimestamp),
    sectionTreatments: this.sectionTreatments,
    modifyGroup: this.fb.control(this.data.modifyGroup)
  })

  onSaveClick() {
    this.dialogRef.close({
      modifyGroup: this.sectionForm.get('modifyGroup')?.value,
      sectionId: this.data.sectionId,
      snapshot: {
        id: this.data.snapshot.id,
        ...this.sectionForm.value,
        modifyGroup: undefined // removes the 'modifyGroup' value from this object; must be a better way of doing this
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.dialogRef.close({
      deleted: true,
      modifyGroup: this.data.modifyGroup,
      snapshot: {
        id: this.data.snapshot.id,
      }
    });
  }

  onPlantingDateChange(event: MatDatepickerInputEvent<Date>) {
    if(event.value != null) {
      this.data.snapshot.plantingTimestamp = event.value
    }
  }

  onHarvestedDateChange(event: MatDatepickerInputEvent<Date>) {
    if(event.value != null) {
      this.data.snapshot.harvestedTimestamp = event.value
    }
  }

  onTreatmentDateChange(sectionTreatment: SectionTreatment, event: MatDatepickerInputEvent<Date>) {
    if(event.value != null) {
      sectionTreatment.treatmentTimestamp = event.value;
    }
  }

  onDeleteTreatment(index: number) {
    this.sectionTreatments.removeAt(index);
    this.updateView();
  }

  onAddTreatment() {
    this.addTreatment(undefined, true);
  }

  addTreatment(treatment?: SectionTreatment, updateView?: boolean) {
    // @ts-expect-error TODO: type FormGroup
    this.sectionTreatments.push(this.fb.group({
      treatmentType: this.fb.control((treatment)? treatment.treatmentType: null, [Validators.required]),
      treatmentTimestamp: this.fb.control((treatment)? treatment.treatmentTimestamp: new Date(), [Validators.required]),
    }))

    if(updateView) {
      this.updateView();
    }
  }

  updateView() {
    this.dataSource.next(this.sectionTreatments.controls);
  }
}
