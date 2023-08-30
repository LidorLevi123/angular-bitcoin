import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin.service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  user: User | null = null
  BTC$: Observable<string> | null = null

  private userService = inject(UserService)
  private bitcoinService = inject(BitcoinService)

  ngOnInit(): void {
    this.userService.loggedInUser$.subscribe(user => {
      this.user = user
      this.BTC$ = this.bitcoinService.getRate(this.user.coins)
    })
  }

  onAddCoins() {
      this.userService.updateCoins(1326)
  }
}
