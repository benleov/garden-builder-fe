import {Component, Inject} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {MonthHardinessZone, Plant, PlantFamily, PlantPosition, PlantTask} from "@app/api/plant";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BehaviorSubject} from "rxjs";

export interface PlantDialogData {
  plant: Plant;
}

@Component({
  selector: 'app-plant-dialog',
  templateUrl: './plant-dialog.component.html',
  styleUrls: ['./plant-dialog.component.scss']
})
export class PlantDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PlantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlantDialogData,
    private fb: FormBuilder,
  ) {
    this.data.plant?.sowingMonthHardinessZones?.forEach(
      (monthHardinessZone: MonthHardinessZone) =>
        this.addSowingMonthHardinessZone(monthHardinessZone, false));

    this.data.plant?.plantTasks?.forEach(
      (plantTask: PlantTask) =>
        this.addPlantTask(plantTask, false));

    this.updateHardinessView();
    this.updatePlantTaskView();
  }

  allPlantFamilies = Object.values(PlantFamily);
  allPlantPositions = Object.values(PlantPosition)
  allMonths = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
  allHardinessZones = ['TWELVE', 'ELEVEN', 'TEN', 'NINE_A', 'NINE_B']
  allPlantTaskTypes = ['WATERING', 'SEEDING_TRAYS', 'SEEDING_DIRECT', 'WEEDING', 'FERTILIZING', 'TRANSPLANTING', 'HARVESTING', 'NETTING']

  sowingMonthHardinessZones = this.fb.array([])
  plantTasks = this.fb.array([])

  hardinessZonesDataSource = new BehaviorSubject<AbstractControl[]>([]);
  plantTasksDataSource = new BehaviorSubject<AbstractControl[]>([]);

  sowingMonthDisplayColumns = ['month', 'hardinessZone', 'actions']
  plantTaskColumns = ['type', 'startOffset', 'actions']

  plantForm = this.fb.group({
    name: this.fb.control(this.data.plant.name, [Validators.required]),
    variety: this.fb.control(this.data.plant.variety),
    family: this.fb.control(this.data.plant.family, [Validators.required]),
    species: this.fb.control(this.data.plant.species,),
    emojiCodePoint: this.fb.control(this.data.plant.emojiCodePoint, [Validators.required]),
    thumbnailUrl: this.fb.control(this.data.plant.thumbnailUrl,),
    fullSizeUrl: this.fb.control(this.data.plant.fullSizeUrl,),

    perennial: this.fb.control(this.data.plant.perennial,),
    medianDaysLifespan: this.fb.control(this.data.plant.medianDaysLifespan,),
    medianDaysToFirstHarvest: this.fb.control(this.data.plant.medianDaysToFirstHarvest),
    medianDaysToLastHarvest: this.fb.control(this.data.plant.medianDaysToLastHarvest,),
    heightRangeCm: this.fb.control(this.data.plant.heightRangeCm,),
    spacingCm: this.fb.control(this.data.plant.spacingCm,),
    position: this.fb.control(this.data.plant.position,),
    wateringLevel: this.fb.control(this.data.plant.wateringLevel,),
    companionPlants: this.fb.control(this.data.plant.companionPlants,),
    sowingMonthHardinessZones: this.sowingMonthHardinessZones,
    plantTasks: this.plantTasks,
  })

  onCancelClick() {
    this.dialogRef.close();
  }

  onSaveClick() {
    this.dialogRef.close({
      id: this.data.plant.id,
      ...this.plantForm.value
    });
  }

  addSowingMonthHardinessZone(monthHardinessZone?: MonthHardinessZone, updateView?: boolean) {

    // @ts-expect-error TODO: type FormGroup
    this.sowingMonthHardinessZones.push(this.fb.group({
      month: this.fb.control((monthHardinessZone) ? monthHardinessZone.month : 'JANUARY', [Validators.required]),
      hardinessZone: this.fb.control((monthHardinessZone) ? monthHardinessZone.hardinessZone : null, [Validators.required]),
    }))

    if (updateView) {
      this.updateHardinessView();
    }
  }

  addPlantTask(plantTask?: PlantTask, updateView?: boolean) {
    // @ts-expect-error TODO: type FormGroup
    this.plantTasks.push(this.fb.group({
      type: this.fb.control((plantTask) ? plantTask.type : 'WATERING', [Validators.required]),
      startOffset: this.fb.control((plantTask) ? plantTask.startOffset : null, [Validators.required]),
    }))

    if (updateView) {
      this.updatePlantTaskView();
    }
  }

  onAddHardinessZone() {
    this.addSowingMonthHardinessZone(undefined, true);
  }

  onAddPlantTask() {
    this.addPlantTask(undefined, true);
  }

  onDeleteHardinessZone(index: number) {
    this.sowingMonthHardinessZones.removeAt(index);
    this.updateHardinessView();
  }

  updateHardinessView() {
    this.hardinessZonesDataSource.next(this.sowingMonthHardinessZones.controls);
  }

  updatePlantTaskView() {
    this.plantTasksDataSource.next(this.plantTasks.controls);
  }

  onDeletePlantTask(index: number) {
    this.plantTasks.removeAt(index);
    this.updatePlantTaskView()
  }
}
