import { Component, OnInit } from '@angular/core';
import { ServerService } from './service/server.service';
import {
  Observable,
  map,
  startWith,
  catchError,
  of,
  BehaviorSubject,
} from 'rxjs';
import { AppState } from './interface/app-state.interface';
import { CustomResponse } from './interface/custom-response.interface';
import { DataState } from './data-state.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { Status } from './enum/status.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Server } from './interface/server.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'server-management';
  appState$: Observable<AppState<CustomResponse>>;
  DataState = DataState;
  Status = Status;
  filterSubject = new BehaviorSubject<string>('');
  filterStatus$ = this.filterSubject.asObservable();
  dataSubject = new BehaviorSubject<CustomResponse>(null);

  constructor(
    private serverService: ServerService,
    private modalService: NgbModal
  ) {}

  //first render the table of server list
  ngOnInit(): void {
    this.appState$ = this.serverService.servers$.pipe(
      map((response) => {
        this.dataSubject.next(response);
        return { dataState: DataState.LOADED_STATE, appData: response };
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: HttpErrorResponse) => {
        return of({ dataState: DataState.ERROR_STATE, error: error });
      })
    );
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then();
  }

  //pining server and change the statu
  pingServer(ipAddress: string): void {
    this.filterSubject.next(ipAddress);

    this.appState$ = this.serverService.pingedServer$(ipAddress).pipe(
      map((response) => {
        const servers = this.dataSubject.value.data.servers;
        this.filterSubject.next('');
        servers[
          servers.findIndex((server) => server.id === response.data.server.id)
        ] = response.data.server;

        return {
          dataState: DataState.LOADED_STATE,
          appData: this.dataSubject.value,
        };
      }),
      startWith({
        dataState: DataState.LOADED_STATE,
        appData: this.dataSubject.value,
      }),
      catchError((error: HttpErrorResponse) => {
        this.filterSubject.next('');
        return of({ dataState: DataState.ERROR_STATE, error });
      })
    );
  }

  //server filtering frontend part
  filterServer(status: Status): void {
    this.appState$ = this.serverService
      .filteredServers$(status, this.dataSubject.value)
      .pipe(
        map((response) => {
          return { dataState: DataState.LOADED_STATE, appData: response };
        }),
        startWith({
          dataState: DataState.LOADED_STATE,
          appData: this.dataSubject.value,
        }),
        catchError((error: HttpErrorResponse) => {
          return of({ dataState: DataState.ERROR_STATE, error });
        })
      );
  }

  //creating new server
  saveServer(serverForm: NgForm): void {
    console.log(serverForm);
    this.appState$ = this.serverService
      .saveServer$(serverForm.value as Server)
      .pipe(
        map((response) => {
          const servers = this.dataSubject.value.data.servers;
          this.dataSubject.next({
            ...response,
            data: { servers: [response.data.server, ...servers] },
          });
          modal.dismiss();
          return {
            dataState: DataState.LOADED_STATE,
            appData: this.dataSubject.value,
          };
        }),
        startWith({
          dataState: DataState.LOADED_STATE,
          appData: this.dataSubject.value,
        }),
        catchError((error: HttpErrorResponse) => {
          return of({ dataState: DataState.ERROR_STATE, error });
        })
      );
  }
}
