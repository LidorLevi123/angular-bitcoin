import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ContactFilter } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit, OnDestroy {

  private contactService = inject(ContactService)
  filterBy!: ContactFilter
  filterBySubject$ = new Subject()
  destroySubject$ = new Subject()

  ngOnInit(): void {
    this.contactService.filterBy$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(filterBy => {
        this.filterBy = filterBy
      })

    this.filterBySubject$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroySubject$)
      )
      .subscribe(() => {
        this.contactService.setFilterBy(this.filterBy)
      })
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null)
    this.destroySubject$.unsubscribe()
  }

  onSetFilterBy(value: string) {
    this.filterBySubject$.next(value)
  }
}
