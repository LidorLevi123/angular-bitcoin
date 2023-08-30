import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'transfer-coin',
  templateUrl: './transfer-coin.component.html',
  styleUrls: ['./transfer-coin.component.scss']
})
export class TransferCoinComponent {

  @Input() contactName!: string
  @Input() user!: User | null
  @Output() transfer = new EventEmitter<number>()

  amount!: number
}
