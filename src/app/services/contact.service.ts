import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, throwError, from, tap, retry, catchError } from 'rxjs'
import { Contact, ContactFilter } from '../models/contact.model'
import { storageService } from './async-storage.service'
import { HttpErrorResponse } from '@angular/common/http'
const ENTITY = 'contacts'

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private _contacts$ = new BehaviorSubject<Contact[]>([])
    public contacts$ = this._contacts$.asObservable()

    private _filterBy$ = new BehaviorSubject<ContactFilter>({ term: '' });
    public filterBy$ = this._filterBy$.asObservable()

    constructor() {
        // Handling Demo Data, fetching from storage || saving to storage 
        const contacts = JSON.parse(localStorage.getItem(ENTITY) || 'null')
        if (!contacts || contacts.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify(this._createContacts()))
        }
    }

    public loadContacts() {
        return from(storageService.query(ENTITY))
            .pipe(
                tap(contacts => {
                    const filterBy = this._filterBy$.value
                    if (filterBy && filterBy.term) {
                        contacts = this._filter(contacts, filterBy.term)
                    }
                    contacts = contacts.filter(contact => 
                        contact.name.toLowerCase().includes(filterBy.term.toLowerCase()) ||
                        contact.phone.includes(filterBy.term))
                    this._contacts$.next(this._sort(contacts))
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public getContactById(id: string): Observable<Contact> {
        return from(storageService.get(ENTITY, id))
            .pipe(catchError(err => throwError(() => `Contact id ${id} not found!`)))
    }

    public deleteContact(id: string) {
        return from(storageService.remove(ENTITY, id))
            .pipe(
                tap(() => {
                    let contacts = this._contacts$.value
                    contacts = contacts.filter(contact => contact._id !== id)
                    this._contacts$.next(contacts)
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public saveContact(contact: Contact) {
        return contact._id ? this._updateContact(contact) : this._addContact(contact)
    }

    public getEmptyContact() {
        return {
            name: '',
            email: '',
            phone: ''
        }
    }

    public setFilterBy(filterBy: ContactFilter) {
        this._filterBy$.next(filterBy)
        this.loadContacts().subscribe()
    }

    private _updateContact(contact: Contact) {
        return from(storageService.put(ENTITY, contact))
            .pipe(
                tap(updatedContact => {
                    const contacts = this._contacts$.value
                    this._contacts$.next(contacts.map(contact => contact._id === updatedContact._id ? updatedContact : contact))
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _addContact(contact: Contact) {
        const newContact = new Contact(contact.name, contact.email, contact.phone)
        if (typeof newContact.setId === 'function') newContact.setId(_getRandomId())
        return from(storageService.post(ENTITY, newContact))
            .pipe(
                tap(newContact => {
                    const contacts = this._contacts$.value
                    this._contacts$.next([...contacts, newContact])
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _sort(contacts: Contact[]): Contact[] {
        return contacts.sort((a, b) => {
            if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
                return -1
            }
            if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                return 1
            }
            return 0
        })
    }

    private _filter(contacts: Contact[], term: string) {
        term = term.toLocaleLowerCase()
        return contacts.filter(contact => {
            return contact.name.toLocaleLowerCase().includes(term) ||
                contact.phone.toLocaleLowerCase().includes(term) ||
                contact.email.toLocaleLowerCase().includes(term)
        })
    }

    private _createContacts() {
        const contacts = [
            {
                "_id": "5a56640269f443a5d64b32ca",
                "name": "Ochoa Hyde",
                "email": "ochoahyde@renovize.com",
                "phone": "+1 (968) 593-3824"
            },
            {
                "_id": "5a5664025f6ae9aa24a99fde",
                "name": "Hallie Mclean",
                "email": "halliemclean@renovize.com",
                "phone": "+1 (948) 464-2888"
            },
            {
                "_id": "5a56640252d6acddd183d319",
                "name": "Parsons Norris",
                "email": "parsonsnorris@renovize.com",
                "phone": "+1 (958) 502-3495"
            },
            {
                "_id": "5a566402ed1cf349f0b47b4d",
                "name": "Rachel Lowe",
                "email": "rachellowe@renovize.com",
                "phone": "+1 (911) 475-2312"
            },
            {
                "_id": "5a566402abce24c6bfe4699d",
                "name": "Dominique Soto",
                "email": "dominiquesoto@renovize.com",
                "phone": "+1 (807) 551-3258"
            },
            {
                "_id": "5a566402a6499c1d4da9220a",
                "name": "Shana Pope",
                "email": "shanapope@renovize.com",
                "phone": "+1 (970) 527-3082"
            },
        ]
        return contacts
    }

    private _handleError(err: HttpErrorResponse) {
        console.log('err:', err)
        return throwError(() => err)
    }
}

function _getRandomId(length = 8): string {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            characters.length))
    }
    return result
}
