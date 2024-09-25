import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable()
export class TablesService {
    apiAddress:string=environment.apiAddress
    constructor(private _httpClient: HttpClient) {}

    public getDashboard(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/user/get_all_applicants', params,{ headers: headers });

    }

    public signup(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/user/add_applicant', params,{ headers: headers });

    }

    public deleteApplicant(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/user/delete_applicants', params,{ headers: headers });

    }

    public getUserDetails(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/user/get_user_info', params,{ headers: headers });
    }

    public getInfo(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/user/get_user_info', params,{ headers: headers });
    }

    public userUpdate(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/user/update_user', params,{ headers: headers });
    }

    public createApplicants(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/user/create_multiple_applicants', params,{ headers: headers });
    }

    public downloadResume(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/user/download_resume', params,{ headers: headers });
    }

    public uploadResume(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        headers.append('Content-Type', 'multipart/form-data');
        return this._httpClient.post(this.apiAddress+'/upload_resume', params,{ headers: headers });
    }

    public getAssigneeList(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/user/get_assignee_list', params,{ headers: headers });
    }

    public sendMessage(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/user/send_message', params,{ headers: headers });

    }

    public downloadApplicants(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/user/download_applicants', params,{ headers: headers });

    }

    public downloadSampleFile(params:any): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;');
        return this._httpClient.post(this.apiAddress+'/user/download_sample_file', params,{ headers: headers });
    }
}

