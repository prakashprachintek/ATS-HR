import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders, HttpParams  } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class JobService {
    apiAddress:string=environment.apiAddress
    constructor(private _httpClient: HttpClient) {}

    public getDashboard(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/jobs/get_all_jobs', params,{ headers: headers });
    }

    public closeJob(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/jobs/close_job', params,{ headers: headers });

    }

    public createJob(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/jobs/create_job', params,{ headers: headers });

    }

    public getJobInfo(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/jobs/job_transcation_info', params,{ headers: headers });
    }

    public searchByPhone(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/user/get_user_by_phoneNumber', params,{ headers: headers });

    }

    public downloadJobDetails(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/jobs/download_job_details', params,{ headers: headers });
     }
}
