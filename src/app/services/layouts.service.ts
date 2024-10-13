import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, of, tap} from "rxjs";
import {Layout} from "@app/api/layout";
import {MessagesService} from "@app/services/messages.service";
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class LayoutsService {

  private layoutsUrl = `${environment.apiUrl}/layouts`;  // URL to web api e.g api/layouts

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) { }

  getLayouts(): Observable<Layout[]> {
    return this.http.get<Layout[]>(`${this.layoutsUrl}/`)
      .pipe(
        catchError(this.handleError<Layout[]>('getLayouts', []))
      );
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

  saveLayout(layout: Layout): Observable<Layout> {
    return this.http.post<Layout>(this.layoutsUrl, layout, this.httpOptions).pipe(
      tap((newLayout: Layout) => this.messageService.add(`added layout w/ id=${newLayout.id}`)),
      catchError(this.handleError<Layout>('saveLayout'))
    );
  }
}

