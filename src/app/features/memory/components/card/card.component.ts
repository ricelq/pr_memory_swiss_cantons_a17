import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {


  @Input() card: any = {};
  @Input() isPaused: boolean = false;
  @Output() cardClicked = new EventEmitter<HTMLDivElement>();

  clickEvent(event: MouseEvent) {

    if (this.isPaused) {
      return;
    }

    const clickedCard = event.target as HTMLDivElement;

    if (!clickedCard.classList.contains('card--picked')) {
      this.flipCard(clickedCard);
      this.cardClicked.emit(clickedCard);
    }
  }

  flipCard(clickedCard: HTMLDivElement) {
    clickedCard.classList.add('card--picked')
  }

}
