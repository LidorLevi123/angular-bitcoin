import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  subscription!: Subscription
  contact$!: Observable<Contact>
  contact!: Contact

  ngOnInit(): void {
    this.loaderService.setIsLoading(false)
    this.contact$ = this.route.data.pipe(map(data => data['contact']))
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  onBack() {
    this.router.navigateByUrl('contact')
    // this.router.navigate(['/'])
  }
}
