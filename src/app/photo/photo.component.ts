import { Component, Input } from "@angular/core";

@Component ({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent { 
    //url: any;
    //description: any;

    @Input() description = String;
    @Input() url: any;
}