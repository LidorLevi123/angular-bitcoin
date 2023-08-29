import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() { }

    user = {
        name: 'Bobovich',
        coins: 100,
        moves: []
    }

    private _loggedInUser$ = new BehaviorSubject(this.user)
    // private _loggedInUser$ = new BehaviorSubject(null)
    public loggedInUser$ = this._loggedInUser$.asObservable()

    getLoggedInUser() {
        return this._loggedInUser$.value
    }
}
