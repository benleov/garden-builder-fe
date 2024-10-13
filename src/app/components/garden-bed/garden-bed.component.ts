import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Garden, SectionGroup, SectionSnapshot, SectionState} from "@app/api/garden";

import {SectionDialogComponent, SectionDialogData} from "@app/components/section-dialog/section-dialog.component";
import {Bed, Layout} from "@app/api/layout";
import {Plant} from "@app/api/plant";
import {MatDialog} from "@angular/material/dialog";
import {GardensService} from "@app/services/gardens.service";
import {
  SectionGroupSelectDialogComponent,
  SectionGroupSelectDialogData
} from "@app/components/section-group-select-dialog/section-group-select-dialog.component";
import {Subscription} from "rxjs";
import {
  SectionHistoryDialogComponent,
  SectionHistoryDialogData
} from "@app/components/section-history-dialog/section-history-dialog.component";
import {GardenComponent} from "@app/components/garden/garden.component";

export interface DisplaySectionState extends SectionState {
  color: string;
  cols: number;
  rows: number;

  disabled: boolean;
  defaultState: boolean;

  sectionId: string;
  groupId: string;
}

export interface DisplayGroup {
  sectionId: string,
  borderColour?: string;
}

@Component({
  selector: 'app-garden-bed',
  templateUrl: './garden-bed.component.html',
  styleUrls: ['./garden-bed.component.scss']
})
export class GardenBedComponent implements OnInit, OnChanges {

  @Input() layout!: Layout;
  @Input() bed!: Bed;
  @Input() garden!: Garden;
  @Input() plants: Plant[] = [];

  columnCount = 0
  displaySectionStates: DisplaySectionState[] = []
  displayGroups: Map<string, DisplayGroup> = new Map<string, DisplayGroup>()

  constructor(
    public dialog: MatDialog,
    public gardensService: GardensService,
    private gardenComponent: GardenComponent
  ) {
  }

  /**
   * If the gardens input is modified by a parent component, this will redraw all the display section states.
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.garden = changes['garden']['currentValue'] as unknown as Garden
    this.refreshAll();
  }

  ngOnInit(): void {
    this.refreshAll();

    this.gardenComponent.sectionStateUpdated.subscribe((event) => {
      this.onExternalSectionStateChange(event);
    });

  }

  refreshAll(): void {
    this.refreshDisplayStates();
    this.refreshDisplayGroups();
  }

  /**
   * Refreshes/creates all DisplaySectionStates from the gardens SectionStates.
   */
  refreshDisplayStates(): void {
    const rows = this.bed.rows;

    // set the column count to the largest row
    const lengths = rows.map((row => row.sections.length))
    this.columnCount = Math.max(...lengths)

    // iterate through the layouts rows
    this.displaySectionStates = rows.map((row) => {

      // add in spacer sections if the row does not take up the entire width
      const spacerSectionCount = this.columnCount - row.sections.length
      const series = [...Array(spacerSectionCount).keys()]

      const spacerSections = series.map((i) => {
        return this.toDisplaySectionState(i.toString(10), undefined, true)
      })

      const mapped = row.sections.map((section) => {
        // find any states for this section in the garden
        const sectionState = this.findSectionStateBySectionId(this.garden!, section.id)
        return this.toDisplaySectionState(section.id, sectionState);
      })
      return [...mapped, ...spacerSections]
    }).flat()
  }

  /**
   * Refresh all display groups
   */
  refreshDisplayGroups(): void {
    const rows = this.bed.rows;
    const groups = rows.map((row) => {
      return row.sections.map((section) => {
        // find any states for this section in the garden
        return this.toDisplayGroup(section.id)
      }) // returns list
    }).flat()

    this.displayGroups = new Map(groups.map(displayGroup => [displayGroup.sectionId, displayGroup]));
  }

  /**
   * refreshes the display group for a single Section
   *
   * @param sectionId
   */
  refreshDisplayGroup(sectionId: string): void {
    const displayGroup = this.toDisplayGroup(sectionId);
    this.displayGroups.set(sectionId, displayGroup);
  }

  /**
   * Creates display group for the given section.
   *
   * @param sectionId
   */
  toDisplayGroup(sectionId: string): DisplayGroup {
    const group = this.findGroupForSection(sectionId);
    if (group) {
      return {
        sectionId: sectionId,
        borderColour: group.colour
      } as DisplayGroup;
    } else {
      // default
      return {
        sectionId: sectionId,
        borderColour: 'transparent'
      } as DisplayGroup
    }
  }

  /**
   * Creates a new DisplaySectionState from a section state, providing extra details that are easily accessible by the component.
   *
   * @param sectionId
   * @param sectionState
   * @param disabled
   */
  toDisplaySectionState(sectionId: string, sectionState?: SectionState, disabled = false): DisplaySectionState {
    if (!sectionState?.snapshots?.length) {
      return this.toDefaultDisplayState(sectionId, sectionState, disabled)  // new state for this section
    } else {
      return this.updateDisplayStateFromSectionState({
        disabled: disabled,
        cols: 1,
        rows: 1,
        ...sectionState,
      } as DisplaySectionState, sectionState)
    }
  }

  /**
   * Updates the provided display section state with the provided section state.
   *
   * @param displaySectionState The display section to update
   * @param sectionState The section state to update from.
   */
  updateDisplayStateFromSectionState(displaySectionState: DisplaySectionState, sectionState: SectionState): DisplaySectionState {

    Object.assign(displaySectionState, sectionState)

    // TODO: handle multiple snapshots
    displaySectionState.color = (this.getLatestSnapshot(sectionState)?.harvestedTimestamp) ? '#654321' : 'darkgreen'
    return displaySectionState
  }

  /**
   * Creates or resets a display state to its default values (if provided).
   *
   * @param sectionId
   * @param sectionState
   * @param disabled Set to true for 'filler' states to populate the ends of rows that are not the full length.
   */
  toDefaultDisplayState(sectionId: string, sectionState?: SectionState, disabled = false): DisplaySectionState {
    const defaultState = {
      cols: 1,
      rows: 1,
      color: 'green',
      disabled: disabled,
      defaultState: true,
      sectionId: sectionId,
      snapshots: [],
    } as unknown as DisplaySectionState

    if (!sectionState) {
      return defaultState
    } else {
      // update existing section state
      return Object.assign(sectionState, defaultState)
    }
  }

  /**
   * Updates the garden state with a new/updated SectionState
   *
   * @param sectionState The new or updated SectionState.
   * @see { updateDisplayState } for updating the model.
   */
  updateGardenState(sectionState: SectionState): void {
    // Update the actual garden model with the changes
    const existingSectionState = this.garden.sectionStates
      .find((sectionState) => sectionState.sectionId === sectionState.sectionId)

    if(existingSectionState) {
      Object.assign(existingSectionState, sectionState)
    } else {
      // didn't exist in the model, add it in
      this.garden.sectionStates.push(sectionState)
    }
  }

  findBedForSectionState(sectionState: SectionState): Bed | null {

    for (const bed of this.layout.beds) {
      for (const row of bed.rows) {
        const found = row.sections.some((section) => section.id == sectionState.sectionId);
        if(found) {
          return bed;
        }
      }
    }
    return null;
  }

  /**
   * Updates or creates the display for given a sectionState.
   *
   * Note this only updates the displaySectionStates, not the garden.sectionStates.
   *
   * @see { updateGardenState } for updating the model.
   * @param sectionState The new or updated SectionState.
   */
  updateDisplayState(sectionState: SectionState): void {

    // find and update front end representation for this state
    const bed = this.findBedForSectionState(sectionState);

    if(bed && bed.id !== this.bed.id) {
      // this section state does not exist in this bed. Emit to all bed components to check to see
      // if they hold this state, and if so, update
      this.gardenComponent.onSectionStateUpdated({ bed, sectionState });
      return;
    }

    if (sectionState.id) {

      const existingDisplaySectionState = this.displaySectionStates
        .find((displayState) => displayState.sectionId === sectionState!.sectionId)

      if (existingDisplaySectionState) {
        this.updateDisplayStateFromSectionState(existingDisplaySectionState, sectionState);
      } else {
        // the new section state has been added, but it is without a matching display section. Add it
        this.displaySectionStates.push(this.toDisplaySectionState(sectionState.sectionId, sectionState))
      }
    }

    this.refreshDisplayGroup(sectionState.sectionId);
  }

  /**
   * Called when a section state is updated from an external source, e.g. another bed via a group update.
   *
   */
  onExternalSectionStateChange(event: {bed: Bed, sectionState: SectionState}): void {
    if(event.bed.id === this.bed.id) {
      this.updateDisplayState(event.sectionState)
    }
  }

  /**
   * Called when a display section is clicked.
   *
   * @param displaySectionState
   */
  onSelectSectionState(displaySectionState: DisplaySectionState): void {

    const snapshot = this.findLatestSnapshotBySectionId(this.garden, displaySectionState.sectionId)

    const dialogRef = this.dialog.open(SectionDialogComponent, {
      width: '850px',
      data: {
        snapshot: snapshot || {},
        plants: this.plants,
        deleted: false,
        modifyGroup: false,
        sectionId: displaySectionState.sectionId,
        sectionStateId: displaySectionState.id,
        isInGroup: !!this.findGroupForSection(displaySectionState.sectionId)
      } as SectionDialogData,
    });

    dialogRef.afterClosed().subscribe(rawResult => {

      if (!rawResult) {
        return // dialog canceled
      }

      const result: SectionDialogData = rawResult as SectionDialogData

      if (result.deleted) {
        this.gardensService.deleteSectionSnapshot(this.garden.id!, displaySectionState.id, snapshot!.id).subscribe(() => {
          this.deleteSectionState(displaySectionState.sectionId, displaySectionState.id)
        });
      } else {  // add/update

        const modifyGroup = result.modifyGroup

        let sectionIds: string[]

        if (modifyGroup) {
          const group = this.findGroupForSection(result.sectionId);
          sectionIds = group!.sections.map((section) => section.id)
        } else {
          sectionIds = [rawResult.sectionId]
        }

        const modified: SectionState[] = sectionIds.map(sectionId => {
          const state = this.findSectionStateBySectionId(this.garden, sectionId)
          if (state) {
            return {
              ...state,
              snapshots: [{
                ...rawResult.snapshot,
                id: this.getLatestSnapshot(state)?.id // overriding the modified snapshot id with one for this section
              }]
            } as SectionState
          } else {
            return {
              sectionId: sectionId,
              snapshots: [{
                ...rawResult.snapshot,
                id: undefined, // new snapshot, unset the id
              }]
            } as SectionState
          }
        })

        this.upsertSectionStates(modified)
      }
    })
  }

  upsertSectionStates(states: SectionState[]): void {

    const newStates = states.filter((state) => !state.id)

    if (newStates.length) {
      this.gardensService
        .addSectionStates(this.garden.id!, newStates)
        .subscribe((added: SectionState[]) => {
          added.forEach(it => {
            this.updateGardenState(it)
            this.updateDisplayState(it)
          })
        })
    }

    const existingStates = states.filter((state) => !!state.id)
    if (existingStates.length) {
      this.gardensService
        .patchSectionStates(this.garden.id!, existingStates)
        .subscribe((added: SectionState[]) => {
          added.forEach(it => {
            this.updateGardenState(it)
            this.updateDisplayState(it)
          })
        });
    }
  }

  /**
   * Selecting/changing a SectionGroup. Changing a section group (in the dropdown) results in updating the old group
   * (removing the section) and added in into the newly selected group (it doesn't have a direct association) .
   *
   * @param displaySectionState
   */
  onSelectSectionGroup(displaySectionState: DisplaySectionState): void {
    const originalGroup = this.findGroupForSection(displaySectionState.sectionId);

    const dialogRef = this.dialog.open(SectionGroupSelectDialogComponent, {
      width: '850px',
      data: {
        sectionId: displaySectionState.sectionId,
        groups: this.garden.sectionGroups,
        groupId: originalGroup?.id
      } as SectionGroupSelectDialogData,
    });
    dialogRef.afterClosed().subscribe(rawResult => {

      if (!rawResult) {
        return // dialog canceled
      }

      const newGroup = this.garden.sectionGroups.find(sectionGroup => sectionGroup.id == rawResult.groupId)!

      if (originalGroup?.id !== newGroup.id) { // group has changed

        let groupFrom;

        if (originalGroup) { // was in another group before; remove from that group
          groupFrom = {
            ...originalGroup,
            sections: originalGroup.sections.filter((section) => section.id !== rawResult.sectionId)
          }
        }

        const groupTo = {
          ...newGroup,
          sections: [...(newGroup.sections || []), {
            id: rawResult.sectionId
          }]
        }
        this.updateSectionGroup(this.garden.id!, groupTo, displaySectionState, groupFrom);
      } // group not modified
    })
  }

  /**
   * View the history (all the states) for the selected section
   *
   * @param displaySectionState
   */
  onViewSectionHistory(displaySectionState: DisplaySectionState) {
    this.gardensService.getSectionStateById(this.garden.id!, displaySectionState.id).subscribe(sectionState => {
      this.dialog.open(SectionHistoryDialogComponent, {
        width: '200px',
        data: {
          plants: this.plants,
          sectionState: sectionState,
        } as SectionHistoryDialogData,
      });
    });
  }

  /**
   * Updates the provided SectionGroup. Note that the states are stored in a list against the group, and don't have
   * a direct association with the state, so 'moving' a state requires that it is first removed from its old group and
   * into its new one.
   *
   * @param gardenId Garden this state belongs to
   * @param groupTo Group the state is moving to
   * @param sectionState SectionState that is moving
   * @param groupFrom Group the state is moving from
   */
  updateSectionGroup(gardenId: string, groupTo: SectionGroup, sectionState: SectionState, groupFrom?: SectionGroup): Subscription {

    return this.gardensService.updateMultipleSectionGroups(this.garden.id!, groupTo, groupFrom).subscribe(([updatedFrom, updatedTo]) => {

      const sectionGroups = this.garden.sectionGroups

      if (updatedFrom) {
        sectionGroups.forEach(function (item, i) {
          if (item.id == updatedFrom.id) sectionGroups[i] = updatedFrom;
        });
      }

      sectionGroups.forEach(function (item, i) {
        if (item.id == updatedTo.id) sectionGroups[i] = updatedTo;
      });

      this.updateDisplayState(sectionState)
    })
  }

  /**
   * Deletes section state with the provided id, and removes the display state.
   *
   * @param sectionId
   * @param sectionStateId
   */
  deleteSectionState(sectionId: string, sectionStateId: string) {
    const sectionStates = this.garden!.sectionStates
    sectionStates.splice(0, sectionStates.length,
      ...sectionStates.filter((sectionState) => sectionState.id !== sectionStateId))

    const displaySectionState =
      this.displaySectionStates.find((sectionState) => sectionState.id === sectionStateId)
    this.toDefaultDisplayState(displaySectionState!.sectionId, displaySectionState)
  }

  /**
   * Determines how many days have passed since planting as a percentage of the median days to first harvest.
   *
   * @param plantedTimestamp
   * @param medianDaysToFirstHarvest
   */
  percentageProgress(plantedTimestamp?: Date, medianDaysToFirstHarvest?: number) {
    if (plantedTimestamp !== undefined) {
      const now = Date.now()
      const elapsedDays = (now - new Date(plantedTimestamp).getTime()) / (1000 * 3600 * 24)
      return Math.round((elapsedDays / medianDaysToFirstHarvest!) * 100);
    } else {
      return 0;
    }
  }

  /**
   * Finds the SectionGroup that this section belongs to (if any).
   *
   * @param sectionId
   */
  findGroupForSection(sectionId: string): SectionGroup | undefined {
    return this.garden.sectionGroups.find(
      sectionGroup => (sectionGroup.sections || []).find(
        section => section.id === sectionId
      ))
  }

  findSectionStateById(garden: Garden, sectionStateId: string): SectionState | undefined {
    return garden.sectionStates.find((state) => state.id === sectionStateId)
  }

  findSectionStateBySectionId(garden: Garden, sectionId: string): SectionState | undefined {
    return garden.sectionStates.find((state) => state.sectionId === sectionId)
  }

  findSnapshotById(garden: Garden, sectionId: string, snapshotId: string): SectionSnapshot | undefined {
    const state = this.findSectionStateBySectionId(garden, sectionId)
    return state?.snapshots.find((snapshot) => snapshot.id === snapshotId)
  }

  addSnapshotToSectionState(garden: Garden, sectionId: string, sectionStateId: string, snapshot: SectionSnapshot): SectionState {
    const sectionState = this.findSectionStateById(garden, sectionStateId)

    if (sectionState) {
      sectionState.snapshots = [...(sectionState!.snapshots || []), snapshot]
      return sectionState
    } else {
      const newSectionState = {
        id: sectionStateId,
        sectionId: sectionId,
        snapshots: [snapshot],
      } as SectionState

      garden.sectionStates.push(newSectionState)
      return newSectionState
    }
  }

  findPlantById(plantId: string): Plant | undefined {
    return this.plants.find((plant) => plant.id === plantId)
  }

  findLatestSnapshotBySectionId(garden: Garden, sectionId: string): SectionSnapshot | undefined {
    const state = this.findSectionStateBySectionId(garden, sectionId)
    if (state) {
      return this.getLatestSnapshot(state)
    } else {
      return undefined
    }
  }

  /**
   * Because this only returns the latest snapshot, the frontend cannot display multiple plants (i.e. something
   * being harvested, then another plant planted) in the same month.
   *
   * @deprecated Frontend needs to be able to handle multiple snapshots for a state.
   *
   * @param sectionState
   */
  getLatestSnapshot(sectionState: SectionState): SectionSnapshot | undefined {
    if (sectionState?.snapshots?.length) {
      if (sectionState?.snapshots?.length > 1) {
        console.log(`Section state has ${sectionState?.snapshots?.length} states`)
      }
      return sectionState.snapshots[0] // TODO
    } else {
      return undefined
    }
  }

  getPlantForSection(sectionState: SectionState): Plant {
    const plantId = this.getLatestSnapshot(sectionState)?.plantId

    if (plantId) {
      return this.findPlantById(plantId)!
    } else {
      return {} as Plant
    }
  }
}
