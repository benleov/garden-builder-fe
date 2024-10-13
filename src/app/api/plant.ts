export interface Plant {
  id: string;
  name: string;
  variety: string;
  family?: PlantFamily,
  species?: string,
  emojiCodePoint: string;
  thumbnailUrl?: string;
  fullSizeUrl?: string;
  perennial?: boolean;
  medianDaysLifespan?: number;
  medianDaysToFirstHarvest: number;
  medianDaysToLastHarvest?: number;
  heightRangeCm?: number;
  spacingCm?: number;
  position?: PlantPosition;
  wateringLevel?: number;

  sowingMonthHardinessZones?: MonthHardinessZone[]
  companionPlants?: Plant[]
  plantTasks?: PlantTask[]

}

export interface MonthHardinessZone {
  month: string;
  hardinessZone: string;
}

export interface PlantTask {
  id: string,
  type: PlantTaskType,
  startOffset: number;
}

export enum PlantTaskType {
  WATERING = 'WATERING',
  SEEDING_TRAYS = 'SEEDING_TRAYS',
  SEEDING_DIRECT = 'SEEDING_DIRECT',
  WEEDING = 'WEEDING',
  FERTILIZING = 'FERTILIZING',
  TRANSPLANTING = 'TRANSPLANTING',
  HARVESTING = 'HARVESTING',
  NETTING = 'NETTING',
}

export enum PlantFamily {
  AMARYLLIDACEAE = 'AMARYLLIDACEAE',
  ASTERACEAE = 'ASTERACEAE',
  BRASSICACEAE = 'BRASSICACEAE',
  CHENOPODIACEAE = 'CHENOPODIACEAE',
  CUCURBITACEAE = 'CUCURBITACEAE',
  FABACEAE = 'FABACEAE',
  UMBELLIFERAE = 'UMBELLIFERAE',
  LAMIACEAE = 'LAMIACEAE',
  LILIACEAE = 'LILIACEAE',
  POACEAE = 'POACEAE',
  ROSACEAE = 'ROSACEAE',
  SOLANACEAE = 'SOLANACEAE',
}

export enum PlantPosition {
  FULL_SUN = 'FULL_SUN',
  PART_SHADE = 'PART_SHADE'
}
