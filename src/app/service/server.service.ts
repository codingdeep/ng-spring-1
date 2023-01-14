import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError, Subject } from 'rxjs';
import { CustomResponse } from '../interface/custom-response.interface';
import { Server } from '../interface/server.interface';
import { Status } from '../enum/status.enum';

@Injectable({ providedIn: 'root' })
export class ServerService {
  constructor(private http: HttpClient) {}

  exclusive = new Subject<boolean>();
  username = new Subject<string>();

  private apiUrl = 'http://localhost:9090/api/v1';

  //procedural way to request
  //getServers(): Observable<CustomResponse> {
  // return this.http.get<CustomResponse>(`http://localhost:9090/api/v1/server`);
  // }

  //get list of server
  servers$ = <Observable<CustomResponse>>(
    this.http
      .get<CustomResponse>(
        `${this.apiUrl}/server?pageNumber=0&pageSize=100&dir=DEC`
      )
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError)
      )
  );

  //creating new server
  saveServer$ = (server: Server) =>
    <Observable<CustomResponse>>(
      this.http.post<CustomResponse>(`${this.apiUrl}/server`, server).pipe(
        tap((data: CustomResponse) => console.log(data)),
        catchError(this.handleError)
      )
    );

  //updating server
  updatedServer$ = (server: Server, id: number) =>
    <Observable<CustomResponse>>(
      this.http.put<CustomResponse>(`${this.apiUrl}/server/${id}`, server).pipe(
        tap((data: CustomResponse) => console.log(data)),
        catchError(this.handleError)
      )
    );

  //pinging server
  pingedServer$ = (ipAddress: string) =>
    <Observable<CustomResponse>>(
      this.http
        .get<CustomResponse>(`${this.apiUrl}/server/ping/${ipAddress}`)
        .pipe(
          tap((data: CustomResponse) => console.log(data)),
          catchError(this.handleError)
        )
    );

  //filter server by the status frontend side
  filteredServers$ = (status: Status, response: CustomResponse) =>
    <Observable<CustomResponse>>new Observable<CustomResponse>((subscriber) => {
      subscriber.next(
        status === Status.ALL
          ? { ...response, message: `Server is filtered by ${status} status` }
          : {
              ...response,
              message:
                response?.data?.servers?.filter(
                  (server) => server.status === status
                ).length > 0
                  ? status === Status.SERVER_UP
                    ? 'SERVER UP'
                    : 'SERVER DOWN'
                  : 'No server is found  of ' + status + 'found',
              data: {
                servers: response.data.servers?.filter(
                  (server) => server.status === status
                ),
              },
            }
      );
      subscriber.complete();
    }).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );

  //deleting any server by it's id
  deleteServer$ = (serverId: number) =>
    this.http.delete<void>(`${this.apiUrl}/${serverId}`).pipe(
      tap(() => console.log('data is delete')),
      catchError(this.handleError)
    );

  //handle error
  private handleError(error: any): Observable<never> {
    console.log(error);
    return throwError(() => error);
  }
}
