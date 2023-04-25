import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EROUTES } from '@family-planner/utils';

@Component({
  selector: 'fpl-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() links: { title: string; value: EROUTES }[] = [];
  @Output()
  clickHandler: EventEmitter<EROUTES> = new EventEmitter<EROUTES>();

  EROUTES = EROUTES;
}
