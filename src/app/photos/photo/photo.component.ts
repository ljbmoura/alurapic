import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

const CLOUD = `${environment.apiUrl}/imgs/`;


@Component ({
    // tslint:disable-next-line: component-selector
    selector: 'ap-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {


    private _url: String;
    @Input() description: String = '';

    @Input() set url (url: String) {
        if (!url.startsWith('data')) {
            this._url = CLOUD + url;
        } else {
            this._url = url;
        }
    }

    get url() {
        return this._url;
    }
}
