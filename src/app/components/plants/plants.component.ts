import {Component, OnInit} from '@angular/core';
import {MonthHardinessZone, Plant} from "@app/api/plant";
import {PlantsService} from "@app/services/plants.service";
import {MatDialog} from "@angular/material/dialog";
import {PlantDialogComponent} from "@app/components/plant-dialog/plant-dialog.component";

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})
export class PlantsComponent implements OnInit {

  plants: Plant[] = [];
  columns: string[] = [
    'id',
    'name',
    'variety',
    'family',
    'species',
    'emoji',
    'perennial',
    'medianDaysLifespan',
    'medianDaysToFirstHarvest',
    'medianDaysToLastHarvest',
    'heightRangeCm',
    'position',
    'wateringLevel',
    'sowingMonthHardinessZones',
    'companionPlants',
    'thumbnail',
    'emojiCodePoint',
    'controls'
  ]

  constructor(
    public dialog: MatDialog,
    private plantService: PlantsService,
  ) {
  }

  ngOnInit(): void {
    this.getPlants();
  }

  getPlants(): void {
    this.plantService.getPlants()
      .subscribe(plants => this.plants = plants);
  }

  newPlant() {
    const dialogRef = this.dialog.open(PlantDialogComponent, {
      width: '500px',
      data: {
        plant: {
          name: 'New plant',
        }
      }
    });

    dialogRef.afterClosed().subscribe(rawResult => {
      if (rawResult) {
        this.plantService.savePlant(rawResult).subscribe(plant => {
          this.plants = [...this.plants, plant];
        });
      }
    })
  }

  editPlant(plant: Plant) {
    const dialogRef = this.dialog.open(PlantDialogComponent, {
      width: '500px',
      data: {
        plant: plant,
      }
    });

    dialogRef.afterClosed().subscribe(rawResult => {
      if (rawResult) {
        this.plantService.updatePlant(rawResult).subscribe(plant => {
          this.plants = this.plants.map((item) => {
            return item.id == plant.id ? plant : item;
          });
        });
      }
    })
  }

  deletePlant(plant: Plant) {
    this.plantService.deletePlant(plant).subscribe(() => {
      this.plants = this.plants.filter((item) => {
        return item.id !== plant.id
      })
    });
  }

  hardinessZonesToString(zones?: MonthHardinessZone[]) {
    return zones?.map((zone) => `<li>${zone.hardinessZone} - ${zone.month}</li>`).join('')
  }
}
