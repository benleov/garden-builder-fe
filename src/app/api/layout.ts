/**
 * Example structure of a layout:
 * {
 *     "id": "521df0d2-8818-4bbb-8281-d9c76cd62a9e",
 *     "beds": [
 *         {
 *             "id": "62d57d57-0956-4166-9ae2-2360f9c57ff4",
 *             "rows": [
 *                 {
 *                     "id": "b69c4c17-0ec4-4af8-97e3-893162addc74",
 *                     "sections": [
 *                         {
 *                             "id": "d6a27fe6-cd68-4369-8ef2-838fa4d83b3f"
 *                         }
 *                     ]
 *                 }
 *             ]
 *         }
 *     ]
 * }
 */

export interface Layout {
  id: string;
  name: string;
  beds: Bed[];
}

export interface Bed {
  id: string;
  name?: string;
  rows: Row[];

}
export interface Row {
  id: string;
  sections: Section[];
}
export interface Section {
  id: string;
}
