import {Injectable} from '@angular/core';
import {getStatusText, InMemoryDbService, ResponseOptions, STATUS} from 'angular-in-memory-web-api';
import {SectionGroup, SectionSnapshot, SectionState, SectionTreatment, TreatmentType} from "@app/api/garden";
import {RequestInfo} from "angular-in-memory-web-api";
import {Plant} from "@app/api/plant";
import {Bed, Layout, Row, Section} from "@app/api/layout";

@Injectable({
  providedIn: 'root'
})

export class TestDataService implements InMemoryDbService {

  createDb() {
    // defaults to 'api/products
    return {
      plants: [{
        id: '1',
        name: 'Tomato',
        variety: 'Tomato',
        emojiCodePoint: '1F345',
        medianDaysToFirstHarvest: 90,
      } as Plant, {
        id: '2',
        name: 'Corn',
        variety: 'Corn',
        emojiCodePoint: '1F33D',
        medianDaysToFirstHarvest: 180,
      } as Plant, {
        id: '3',
        name: 'Potato',
        variety: 'Potato',
        emojiCodePoint: '1F954',
        medianDaysToFirstHarvest: 210,
      } as Plant, {
        id: '4',
        name: 'Garlic',
        variety: 'Garlic',
        emojiCodePoint: '1F9C4',
        medianDaysToFirstHarvest: 210,
      } as Plant, {
        id: '5',
        name: 'Onion',
        variety: 'Onion',
        emojiCodePoint: '1F9C5',
        medianDaysToFirstHarvest: 210,
      } as Plant, {
        id: '6',
        name: 'Carrot',
        variety: 'Carrot',
        emojiCodePoint: '1F955',
        medianDaysToFirstHarvest: 210,
      } as Plant, {
        id: '7',
        name: 'Broccoli',
        variety: 'Broccoli',
        emojiCodePoint: '1F966',
        medianDaysToFirstHarvest: 210,
      } as Plant, {
        id: '8',
        name: 'Capsicum',
        variety: 'Capsicum',
        emojiCodePoint: '1FAD1',
        medianDaysToFirstHarvest: 210,
      } as Plant, {
        id: '9',
        name: 'Melon',
        variety: 'Melon',
        emojiCodePoint: '1F348',
        medianDaysToFirstHarvest: 210,
      }],
      gardens: [{
        id: '1',
        layoutId: '1234',
        year: 2022,
        season: 'SPRING',
        sectionStates: [{
          id: '1',
          sectionId: '1',
          snapshots: [{
            id: '1',
            plantId: '1',
            plantingTimestamp: new Date(1641112289000),
            harvestedTimeStamp: new Date(1647945832000),
            sectionTreatments: [{
              id: '123123123',
              treatmentType: TreatmentType.FERTILIZER,
              treatmentTimestamp: new Date(1641112289000),
            } as SectionTreatment, {
              id: '1231231238888',
              treatmentType: TreatmentType.SOIL_CONDITIONER,
              treatmentTimestamp: new Date(1641112289000),
            } as SectionTreatment]
          } as SectionSnapshot],
        } as SectionState],
        sectionGroups: [{
          id: '1',
          name: 'Group 1',
          colour: '#ff0000',
          sections: [{
            id: '1'
          }, {
            id: '2'
          }]
        } as SectionGroup]
      }],
      layouts: [{
        id: '1234',
        name: 'Test Layout',
        beds: [
          {
            id: '1234',
            name: 'Main Garden',
            rows: [{
              id: '1',
              sections: [{
                id: '1'
              } as Section, {
                id: '2'
              } as Section, {
                id: '3'
              } as Section, {
                id: '4'
              } as Section, {
                id: '5'
              } as Section, {
                id: '6'
              } as Section, {
                id: '7'
              } as Section, {
                id: '8'
              } as Section, {
                id: '9'
              } as Section, {
                id: '10'
              } as Section, {
                id: '11'
              } as Section, {
                id: '12'
              } as Section, {
                id: '13'
              }]
            } as Row, {
              id: '2',
              sections: [{
                id: '101'
              } as Section, {
                id: '102'
              } as Section, {
                id: '103'
              } as Section, {
                id: '104'
              } as Section, {
                id: '105'
              } as Section, {
                id: '106'
              } as Section, {
                id: '107'
              } as Section, {
                id: '108'
              } as Section, {
                id: '109'
              } as Section, {
                id: '110'
              } as Section, {
                id: '111'
              } as Section, {
                id: '112'
              } as Section, {
                id: '113'
              }]
            } as Row, {
              id: '3',
              sections: [{
                id: '1101'
              } as Section, {
                id: '1102'
              } as Section, {
                id: '1103'
              } as Section, {
                id: '1104'
              } as Section, {
                id: '1105'
              } as Section, {
                id: '1106'
              } as Section, {
                id: '1107'
              } as Section, {
                id: '1108'
              } as Section, {
                id: '1109'
              } as Section, {
                id: '1110'
              } as Section, {
                id: '1111'
              } as Section, {
                id: '1112'
              } as Section, {
                id: '1113'
              } as Section]
            } as Row, {
              id: '4',
              sections: [{
                id: '11101'
              } as Section, {
                id: '11102'
              } as Section, {
                id: '11103'
              } as Section, {
                id: '11104'
              } as Section, {
                id: '11105'
              } as Section, {
                id: '11106'
              } as Section, {
                id: '11107'
              } as Section, {
                id: '11108'
              } as Section, {
                id: '11109'
              } as Section, {
                id: '11110'
              } as Section, {
                id: '11111'
              } as Section, {
                id: '11112'
              } as Section, {
                id: '11113'
              } as Section]
            } as Row, {
              id: '5',
              sections: [{
                id: '111101'
              } as Section, {
                id: '111102'
              } as Section, {
                id: '111103'
              } as Section, {
                id: '111104'
              } as Section, {
                id: '111105'
              } as Section, {
                id: '111106'
              } as Section, {
                id: '111107'
              } as Section, {
                id: '111108'
              } as Section, {
                id: '111109'
              } as Section, {
                id: '111110'
              } as Section, {
                id: '111111'
              } as Section, {
                id: '111112'
              } as Section, {
                id: '111113'
              } as Section]
            }]
          } as Bed, {
            id: '56789',
            name: 'Large Pot',
            rows: [{
              id: '1',
              sections: [{
                id: '21'
              } as Section]
            } as Row, {
              id: '2',
              sections: [{
                id: '22'
              } as Section, {
                id: '23'
              } as Section]
            } as Row]
          } as Bed
        ]
      } as Layout]
    }
  }

  // intercept get method for all in memory requests.
  // HTTP GET interceptor
  get(reqInfo: RequestInfo) {

    /*
     * This returns all gardens regardless of any query parameters, therefore filtering of states based on
     * planted or harvested timestamps will not work.
     */
    if (reqInfo.collectionName === 'gardens') {
      const data = this.createDb().gardens

      return reqInfo.utils.createResponse$(() => {

        const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;

        const options: ResponseOptions = {
          body: dataEncapsulation ? {data} : data,
          status: STATUS.OK
        }
        return TestDataService.finishOptions(options, reqInfo);
      });
    }

    return undefined; // let the default GET handle all others
  }

  private static finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
    options.statusText = getStatusText(options.status!);
    options.headers = headers;
    options.url = url;
    return options;
  }
}
