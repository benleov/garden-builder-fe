import {Section} from "@app/api/layout";

export interface Garden {
  id?: string;
  layoutId: string;
  year: number;
  season: string;
  sectionStates: SectionState[],
  sectionGroups: SectionGroup[],
}

export interface SectionState {
  id: string;
  sectionId: string;
  snapshots: SectionSnapshot[],
}

export interface SectionSnapshot {
  id: string;
  plantId: string;
  plantingTimestamp?: Date,
  harvestedTimestamp?: Date,
  sectionTreatments?: SectionTreatment[],
}

export interface SectionTreatment {
  id: string,
  treatmentType: TreatmentType,
  treatmentTimestamp: Date,
}

export enum TreatmentType {
  FERTILIZER = 'FERTILIZER', SOIL_CONDITIONER = 'SOIL_CONDITIONER'
}

export interface SectionGroup {
  id: string,
  name: string,
  colour: string,
  sections: Section[],
}
