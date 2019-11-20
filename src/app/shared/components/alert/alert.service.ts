import { Injectable } from '@angular/core';
import { Alert, AlertType } from './alert';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertSubject: Subject<Alert> = new Subject<Alert>();

  constructor() {}

  private alert(tipo: AlertType, message: string) {

    this.alertSubject.next(new Alert(tipo, message));
  }

  getAlert() {
    return this.alertSubject.asObservable();
  }

  success (message: string) {
    return this.alert(AlertType.SUCCESS, message);
  }

  info (message: string) {
    return this.alert(AlertType.INFO, message);
  }

  danger (message: string) {
    return this.alert(AlertType.DANGER, message);
  }

  warning (message: string) {
    return this.alert(AlertType.WARNING, message);
  }
}
