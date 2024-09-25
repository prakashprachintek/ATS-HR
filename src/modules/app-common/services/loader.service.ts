import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Input } from '@angular/core';
import { LoaderComponent } from '../containers/loader/loader.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerOverlayService {
  private overlayRef: OverlayRef = undefined
  constructor(private overlay: Overlay) {
  }
   
  public show(): void {
     ////disable browser back  button
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
    ////disable browser back  button
    // Hack avoiding `ExpressionChangedAfterItHasBeenCheckedError` error
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
      });
    });
  }

  public hide(): void {
    if(this.overlayRef!=undefined){
      this.overlayRef.detach();
      this.overlayRef = undefined;
      ////enable browser back  button
      history.pushState(null, null, location.href);
      window.onpopstate = function () {
          history.go(50);
      };
    }
    ////enable browser back  button
  }
}