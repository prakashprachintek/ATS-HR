import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class DashboardService {
    apiAddress:string=environment.apiAddress
    constructor(private _httpClient: HttpClient) {}
    public getDashboard(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/user/get_dashboard_count', params,{ headers: headers });

    }

    // getDashboard$(): Observable<{}> {
        
    //     return of({});
    // }
}
