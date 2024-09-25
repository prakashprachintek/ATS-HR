import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class ChartsGuard implements CanActivate {
    constructor(private router: Router){}
    canActivate(): Observable<boolean> {
        var user = localStorage.getItem('user')
        if(user!=null || user!=undefined){
            return of(true);
        }else{
            this.router.navigate(['/auth/login']);
            return of(false);
        }
    }
}
