import { Component, OnInit, Input } from '@angular/core';
import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

  @Input() timeout = 15000;
  alerts: Alert[] = [];

  constructor(private servico: AlertService) { }

  ngOnInit() {
    const observadorAlertas = {
      next: (alertaNovo: Alert) => {
        // tslint:disable-next-line: no-console
        console.debug('(observadorAlertas) novo alerta chegou.');
        if (!alertaNovo) {
          this.alerts = [];
          return;
        }
        this.alerts.push(alertaNovo);
        setTimeout(() => this.removeAlert(alertaNovo), this.timeout);
      },
      error: (err: any) => {
        const msg = 'erro nos alertas: ';
        console.error(`(observadorExclusao) "${msg}${JSON.stringify(err)}"`);
      },
      complete: () => console.log('(observadorAlertas) completado.'),
    };

    this.servico.getAlert()
      .subscribe(observadorAlertas);
  }

  removeAlert(alertaARemover: Alert) {
    this.alerts = this.alerts.filter(aManter => aManter != alertaARemover);
  }

  getAlertClass(alert:  Alert) {

        if (!alert) { return ''; }

        switch (alert.alertType) {

            case AlertType.DANGER:
                return 'alert alert-danger';
            case AlertType.INFO:
                return 'alert alert-info';
            case AlertType.SUCCESS:
                return 'alert alert-success';
            case AlertType.WARNING:
                return 'alert alert-warning';

        }
    }
}
