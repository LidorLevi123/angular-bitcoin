import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Move } from '../models/user-moves';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor() { }

    user : User = {
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

    addMove(contact: Contact, amount: number) {
        if(!contact._id) return
        const move = { 
            toId: contact._id,
            to: contact.name,
            at: Date.now(),
            amount
        }

        const currentUser = this._loggedInUser$.value
        currentUser.moves.push(move)
    }
}
