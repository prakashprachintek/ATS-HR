import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class OnlineService {
    apiAddress:string=environment.apiAddress
    constructor(private http: HttpClient,private _httpClient: HttpClient) {}

    get version$(): Observable<string> {
        return this.http.get('/assets/version', { responseType: 'text' });
    }
    
    public getJobInfo(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/jobs/job_transcation_info', params,{ headers: headers });
    }

    public signup(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/jobs/create_online_applicant', params,{ headers: headers });
    }

    public uploadResume(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        headers.append('Content-Type', 'multipart/form-data');
        return this._httpClient.post(this.apiAddress+'/upload_resume', params,{ headers: headers });
    }
}
