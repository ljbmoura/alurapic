import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlatformDetectorService } from 'src/app/core/platform/platform-detector.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {
  constructor(private elementoDOM: ElementRef<any>, private gestorPlataforma: PlatformDetectorService) { }

  ngOnInit(): void {
    if (this.gestorPlataforma.isPlatformBrowser()) { this.elementoDOM.nativeElement.click(); }
  }
}
