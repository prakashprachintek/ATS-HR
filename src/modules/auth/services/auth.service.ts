
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    serverUrl!: string;
    apiAddress:string=environment.apiAddress
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
        
    }


    public loginapi(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/auth/login', params,{ headers: headers });

    }
    
    public signup(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/auth/signup', params,{ headers: headers });

    }
    
}
