import { Injectable } from '@angular/core';
import { Alert, AlertType } from './alert';
import { Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertSubject: Subject<Alert> = new Subject<Alert>();
  keepAfterRouteChange = true;

  constructor(router: Router) {
    router.events.subscribe (
      (eventoNavegacao) => {
        if (eventoNavegacao instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
            // n�o remove o alerta apenas para uma navega��o, normalmente a pr�pria
            // navega��o gerada pelo t�rmino com sucesso da a��o (ex: upload da foto)
            this.keepAfterRouteChange = false;
          } else {
            this.alertSubject.next(null); // for�a antecipadamente a remo��o do alerta
          }
        }
      }
    );
  }

  private alert(tipo: AlertType, message: string) {

    this.alertSubject.next(new Alert(tipo, message));
  }

  getAlert() {
    return this.alertSubject.asObservable();
  }

  success (message: string, keepAfterRouteChange: boolean = true) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    return this.alert(AlertType.SUCCESS, message);
  }

  info (message: string, keepAfterRouteChange = true) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    return this.alert(AlertType.INFO, message);
  }

  danger (message: string, keepAfterRouteChange: boolean = true) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    return this.alert(AlertType.DANGER, message);
  }

  warning (message: string, keepAfterRouteChange: boolean = true) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    return this.alert(AlertType.WARNING, message);
  }
}
