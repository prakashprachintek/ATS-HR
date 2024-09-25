import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {
    userDetails:any
    constructor() {
        this.userDetails = JSON.parse(localStorage.getItem('user') || '{}') 
        if(this.userDetails.length>0){
            this.user = {
                id: this.userDetails[0]._id,
                firstName: this.userDetails[0].first_name,
                lastName: this.userDetails[0].last_name,
                email: this.userDetails[0].phone_number,
            };
        }
        
    }

    set user(user: User) {
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }
}
