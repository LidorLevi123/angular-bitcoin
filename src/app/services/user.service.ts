import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() { }

    user = {
        name: 'Puki McPukovich',
        coins: 100,
        moves: []
    }

    // private _loggedInUser$ = new BehaviorSubject(null)
    private _loggedInUser$ = new BehaviorSubject(this.user)
    public loggedInUser$ = this._loggedInUser$.asObservable()

    getLoggedInUser() {
        return this._loggedInUser$.value
    }

    updateCoins(amount: number) {
        const currentUser = this._loggedInUser$.value
        const updatedUser = { ...currentUser, coins: currentUser.coins + amount }
        this._loggedInUser$.next(updatedUser)
    }
}
