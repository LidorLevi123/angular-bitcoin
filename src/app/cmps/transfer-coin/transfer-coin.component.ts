import { Component, Input, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transfer-coin',
  templateUrl: './transfer-coin.component.html',
  styleUrls: ['./transfer-coin.component.scss']
})
export class TransferCoinComponent implements OnInit{

  @Input() contactName!: string
  private userService = inject(UserService)

  amount!: number
  user: User | null = null

  ngOnInit(): void {
    this.userService.loggedInUser$.subscribe(user => this.user = user)
  }

  onSendCoins() {
    if(this.amount <= 0 || !this.amount) return
    this.userService.updateCoins(-this.amount)
  }
}
