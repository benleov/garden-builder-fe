import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, of, tap, zip} from "rxjs";
import {Garden, SectionGroup, SectionSnapshot, SectionState} from "@app/api/garden";
import {MessagesService} from "@app/services/messages.service";
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class GardensService {

  private gardensUrl = `${environment.apiUrl}/gardens`;  // URL to web api e.g api/gardens

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) {
  }

  getGardens(plantedBefore?: Date, harvestedBefore?: Date, harvestedAfter?: Date): Observable<Garden[]> {

    const data = {
      ...(plantedBefore) && {plantedBefore: plantedBefore?.toISOString()},
      ...(harvestedBefore) && {harvestedBefore: harvestedBefore?.toISOString()},
      ...(harvestedAfter) && {harvestedAfter: harvestedAfter?.toISOString()},
    } as unknown as URLSearchParams

    const params = new URLSearchParams(data);

    const url = `${this.gardensUrl}/?${params}`

    return this.http.get<Garden[]>(url)
      .pipe(
        // tap(_ => this.log('fetched gardens')),
        catchError(this.handleError<Garden[]>('getGardens', []))
      );
  }

  saveGarden(garden: Garden): Observable<Garden> {
    console.log('Saving garden')
    return this.http.post<Garden>(this.gardensUrl, garden, this.httpOptions).pipe(
      tap((newGarden: Garden) => this.messageService.add(`added garden w/ id=${newGarden.id}`)),
      catchError(this.handleError<Garden>('saveGarden'))
    );
  }

  getSectionStateById(gardenId: string, sectionStateId: string): Observable<SectionState> {
    return this.http.get<SectionState>(`${this.gardensUrl}/${gardenId}/section-state/${sectionStateId}`)
      .pipe(
        catchError(this.handleError<SectionState>('getSectionStateById'))
      );
  }

  addSectionState(gardenId: string, sectionState: SectionState): Observable<SectionState> {
    console.log('Add section sate')
    return this.http.post<SectionState>(`${this.gardensUrl}${gardenId}/section-state/`, sectionState, this.httpOptions).pipe(
      tap(() => this.messageService.add(`add section state for garden w/ id=${gardenId}`)),
      catchError(this.handleError<SectionState>('addSectionState'))
    );
  }

  addSectionStates(gardenId: string, sectionState: SectionState[]): Observable<SectionState[]> {
    console.log('Add section states')
    return this.http.post<SectionState[]>(`${this.gardensUrl}/${gardenId}/section-states`, sectionState, this.httpOptions).pipe(
      tap(() => this.messageService.add(`add section state for garden w/ id=${gardenId}`)),
      catchError(this.handleError<SectionState[]>('addSectionStates'))
    );
  }

  addSectionSnapshot(gardenId: string, sectionStateId: string, sectionSnapshot: SectionSnapshot): Observable<SectionSnapshot> {
    console.log('Add garden section snapshot')
    return this.http.post<SectionSnapshot>(`${this.gardensUrl}/${gardenId}/section-state/${sectionStateId}/section-snapshot`, sectionSnapshot, this.httpOptions).pipe(
      tap(() => this.messageService.add(`add section snapshot for garden w/ id=${gardenId}`)),
      catchError(this.handleError<SectionSnapshot>('addSectionSnapshot'))
    );
  }

  /**
   * Update an existing snapshot
   * @param gardenId
   * @param sectionStateId
   * @param sectionSnapshot
   */
  updateSectionSnapshot(gardenId: string, sectionStateId: string, sectionSnapshot: SectionSnapshot): Observable<SectionSnapshot> {
    console.log('Updating garden section snapshot')
    return this.http.put<SectionSnapshot>(`${this.gardensUrl}/${gardenId}/section-state/${sectionStateId}/section-snapshot/${sectionSnapshot.id}`, sectionSnapshot, this.httpOptions).pipe(
      tap(() => this.messageService.add(`update section snapshot for garden w/ id=${gardenId}`)),
      catchError(this.handleError<SectionSnapshot>('updateSectionSnapshot'))
    );
  }

  patchSectionStates(gardenId: string, sectionStates: SectionState[]): Observable<SectionState[]> {
    console.log('Patching section states')
    return this.http.patch<SectionState[]>(`${this.gardensUrl}/${gardenId}/section-states`, sectionStates, this.httpOptions).pipe(
      tap(() => this.messageService.add(`patch section section states for garden w/ id=${gardenId}`)),
      catchError(this.handleError<SectionState[]>('patchSectionStates'))
    );
  }

  deleteSectionSnapshot(gardenId: string, sectionStateId: string, sectionSnapshotId: string) {
    console.log('delete garden section snapshot')
    return this.http.delete<SectionState>(`${this.gardensUrl}/${gardenId}/section-state/${sectionStateId}/section-snapshot/${sectionSnapshotId}`, this.httpOptions).pipe(
      tap(() => this.messageService.add(`delete section snapshot for garden w/ id=${gardenId}`)),
      catchError(this.handleError<SectionState>('deleteSectionSnapshot'))
    );
  }

  addSectionGroup(gardenId: string, sectionGroup: SectionGroup): Observable<SectionGroup> {
    console.log('Add garden Section Group')
    return this.http.post<SectionGroup>(`${this.gardensUrl}/${gardenId}/section-group`, sectionGroup, this.httpOptions).pipe(
      tap(() => this.messageService.add(`add section group for garden w/ id=${gardenId}`)),
      catchError(this.handleError<SectionGroup>('addSectionGroup'))
    );
  }

  updateSectionGroup(gardenId: string, sectionGroup: SectionGroup): Observable<SectionGroup> {
    console.log('Updating garden Section Group' + gardenId)
    return this.http.put<SectionGroup>(`${this.gardensUrl}/${gardenId}/section-group/${sectionGroup.id}`, sectionGroup, this.httpOptions)
      .pipe(
        tap(() => this.messageService.add(`updating section group for garden w/ id=${gardenId}`)),
        catchError(this.handleError<SectionGroup>('updateSectionGroup'))
      );
  }

  updateMultipleSectionGroups(gardenId: string, groupTo: SectionGroup, groupFrom?: SectionGroup): Observable<[SectionGroup | null, SectionGroup]> {
    console.log(groupTo)
    console.log(!!groupFrom)
    return zip([
      groupFrom ? this.updateSectionGroup(gardenId, groupFrom) : of(null),
      this.updateSectionGroup(gardenId, groupTo)
    ])
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }

}

