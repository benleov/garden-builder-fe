import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {PlantsService} from "@app/services/plants.service";
import {GardensService} from "@app/services/gardens.service";
import {LayoutsService} from "@app/services/layouts.service";

import {Bed, Layout} from "@app//api/layout";
import {Garden, SectionGroup, SectionState} from "@app/api/garden";
import {Plant} from "@app/api/plant";

import {LayoutDialogComponent, LayoutDialogData} from "@app/components/layout-dialog/layout-dialog.component";
import {GardenDialogComponent, GardenDialogData} from "@app/components/garden-dialog/garden-dialog.component";
import {
  SectionGroupDialogComponent,
  SectionGroupDialogData
} from "@app/components/section-group-dialog/section-group-dialog.component";

import {Subscription} from "rxjs";

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit {
  @Output() sectionStateUpdated = new EventEmitter<{ bed: Bed, sectionState: SectionState }>();

  plants: Plant[] = [];
  layouts: Layout[] = [];
  gardens: Garden[] = [];

  selectedLayout!: Layout;
  selectedGarden!: Garden;
  currentDate = new Date();


  constructor(
    private plantService: PlantsService,
    private gardenService: GardensService,
    private layoutService: LayoutsService,
    public dialog: MatDialog) {
  }

  async ngOnInit() {
    this.fetchPlants();
    this.fetchGardens();
    this.fetchLayouts();
  }

  isSelectedGarden(): boolean {
    return !!this.selectedGarden && !!this.selectedLayout;
  }

  fetchPlants(): Subscription {
    return this.plantService.getPlants()
      .subscribe(plants => {
        this.plants = plants
      });
  }

  fetchLayouts(): void {
    this.layoutService.getLayouts()
      .subscribe(layouts => {
        this.layouts = layouts
        if(layouts.length) {
          this.selectedLayout = this.layouts[0];
        }
      });
  }

  fetchGardens(): void {
    // first and last day of the month
    const plantedBefore = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0) // end of this month
    const harvestedAfter =  new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 2)  // start of month

    this.gardenService.getGardens(plantedBefore, undefined, harvestedAfter)
      .subscribe(gardens => {
        this.gardens = gardens;

        if(this.selectedGarden) {
          this.reselectGarden(this.selectedGarden);
        } else {
          // select garden from first layout
          this.selectFirstGarden();
        }
      });
  }

  newLayout(): void  {
    const dialogRef = this.dialog.open(LayoutDialogComponent, {
      width: '250px',
      data: {
        layout: {
          name: '',
          beds: [],
        }
      } as unknown as LayoutDialogData,
    });

    dialogRef.afterClosed().subscribe(rawResult => {
      console.log(rawResult)
      if(rawResult) {
        this.layoutService.saveLayout(rawResult.layout).subscribe(layout => {
          this.layouts = [...this.layouts, layout];
        });
      }
    })
  }

 gardensOfSelectedLayout(): Garden[] {
   return this.gardens && this.selectedLayout && this.gardens.filter(
     x => x.layoutId === this.selectedLayout.id)
 }

  gardenExistsForLayout(layout: Layout): boolean {
    return this.gardens && !this.gardens.some(
      x => x.layoutId === layout.id)
  }

  onNewGarden(): void {
    const dialogRef = this.dialog.open(GardenDialogComponent, {
      width: '250px',
      data: {
        garden: {
          name: '',
          sectionStates: [],
        },
        layouts: this.layouts,
        selectedLayoutId: this.selectedLayout.id,
      } as unknown as GardenDialogData,
    });

    dialogRef.afterClosed().subscribe(rawResult => {
      if(rawResult) {

        const garden = {
          layoutId: rawResult.layoutId,
          year: rawResult.year,
          season: rawResult.season,
          sectionStates: [],
          sectionGroups: [],
        } as Garden

        this.gardenService.saveGarden(garden).subscribe(garden => {
          this.gardens = [...this.gardens, garden];
        });
      }
    })
  }

  onNewSectionGroup(): void {
    const dialogRef = this.dialog.open(SectionGroupDialogComponent, {
      width: '250px',
      data: {
        sectionGroup: {
          name: '',
          sections: [],
        },
      } as unknown as SectionGroupDialogData,
    });

    dialogRef.afterClosed().subscribe(rawResult => {
      if(rawResult) {
        const sectionGroup = {
          name: rawResult.name,
          colour: rawResult.colour,
        } as SectionGroup
        this.gardenService.addSectionGroup(this.selectedGarden.id!, sectionGroup).subscribe(sectionGroup => {
          console.log("adding section group to selected garden")
          console.log(sectionGroup)
          this.selectedGarden.sectionGroups = [ ...this.selectedGarden.sectionGroups, sectionGroup]
        });
      }
    })
  }

  onLayoutChange() {
    this.selectFirstGarden();
  }

  onSectionStateUpdated(event: {bed: Bed, sectionState: SectionState}): void {
    console.log('section state updated, emitting', event);
    this.sectionStateUpdated.emit(event);
  }

  private selectFirstGarden() {
    if(this.layouts.length) {
      this.selectedGarden = this.gardens.find((garden) => garden.layoutId === this.selectedLayout.id)!;
    }
  }

  private reselectGarden(selected: Garden) {
    this.selectedGarden = this.gardens.find((garden) => garden.id === selected.id)!;
  }

  onNavigateBack() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1)
    this.fetchGardens();
  }

  onNavigateForwards() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1)
    this.fetchGardens();
  }

  getMonthString(date: Date): string {
    const names = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return names[date.getMonth()]
  }
}
