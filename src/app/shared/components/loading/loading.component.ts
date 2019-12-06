import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ap-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  $loading: Observable<String>;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.$loading = this.loadingService
      .getLoading()
      .pipe(map (loadingType => loadingType.valueOf()));
  }

}
