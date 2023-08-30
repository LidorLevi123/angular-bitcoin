import { Component, Input } from '@angular/core';
import { Move } from 'src/app/models/user-moves';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss']
})
export class MoveListcComponent {
  @Input() moves: any
}
