import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { User } from 'src/app/models/user.model';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private loaderService: LoaderService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  subscription!: Subscription
  contact$!: Observable<Contact>
  contact!: Contact
  user: User | null = null

  ngOnInit(): void {
    this.loaderService.setIsLoading(false)
    this.contact$ = this.route.data.pipe(map(data => data['contact']))
    this.userService.loggedInUser$.subscribe(user => this.user = user)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  onTransferCoins(amount: number) {
    if (this.user) {
      if (amount <= 0 || !amount || amount > this.user.coins) return
      this.userService.updateCoins(-amount)
      this.contact$.subscribe(contact => this.userService.addMove(contact, amount))
    }
  }

  onBack() {
    this.router.navigateByUrl('contact')
    // this.router.navigate(['/'])
  }
}
