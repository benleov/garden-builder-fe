import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, of, tap} from "rxjs";
import {Plant} from "@app/api/plant";
import {MessagesService} from "./messages.service";
import {environment} from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class PlantsService {
  private plantsUrl = `${environment.apiUrl}/plants`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService
  ) { }

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.plantsUrl}/`)
      .pipe(
        tap(() => this.messagesService.add('Fetched plants')),
        catchError(this.handleError<Plant[]>('getPlants', []))
      );
  }

  savePlant(plant: Plant): Observable<Plant> {
    console.log('Saving plant')
    return this.http.post<Plant>(this.plantsUrl, plant, this.httpOptions).pipe(
      tap((newPlant: Plant) => this.messagesService.add(`added plant w/ id=${newPlant.id}`)),
      catchError(this.handleError<Plant>('savePlant'))
    );
  }

  updatePlant(plant: Plant): Observable<Plant> {
    console.log('Updating plant')
    return this.http.put<Plant>(`${this.plantsUrl}/${plant.id}`, plant, this.httpOptions).pipe(
      tap((newPlant: Plant) => this.messagesService.add(`updated plant w/ id=${newPlant.id}`)),
      catchError(this.handleError<Plant>('updatePlant'))
    );
  }

  deletePlant(plant: Plant): Observable<Plant> {
    console.log('Updating plant')
    return this.http.delete<Plant>(`${this.plantsUrl}/${plant.id}`).pipe(
      catchError(this.handleError<Plant>('deletePlant'))
    );
  }

  /** Log a PlantService message with the MessageService */
  // private log(message: string) {
  //   this.messageService.add(`PlantService: ${message}`);
  // }

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

