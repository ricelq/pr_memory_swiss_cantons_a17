import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { MemoryService } from '../../services/memory.service';


@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnInit {

  firstCard: HTMLDivElement | undefined;
  firstCardId: string = '';
  secondCard: HTMLDivElement | undefined;
  secondCardId: string = '';
  counter: number = 0;
  cardsToGuessed: number = 0;
  cardsGuessed: number = 0;
  isPaused: boolean = false;
  gameIsOver: boolean = false;

  // inputs from parent component
  @Input() cards: any;

  // emiters
  @Output() hasWin: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() hasLose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() misesCounter: EventEmitter<number> = new EventEmitter<number>();
  @Output() movesCounter: EventEmitter<number> = new EventEmitter<number>();

  // dom
  @ViewChild('gridcontainer') gridcontainer!: ElementRef;

  constructor(private memoryService: MemoryService) {

  }

  ngOnInit(): void {

    this.memoryService.resetCantonsGame.subscribe((needReset) => {
      if (needReset) {
        this.resetAll();
      }
    })

    this.counter = this.cards.length;
    this.cardsToGuessed = this.cards.length / 2;
  }


  cardClicked(clickedCard: HTMLDivElement) {

    const cardId: string = clickedCard.dataset['id'] ?? '';

    if (!this.firstCardId) {

      this.firstCardId = cardId;
      this.firstCard = clickedCard;

    } else {
      this.secondCardId = cardId;
      this.secondCard = clickedCard;

      if (this.firstCardId === this.secondCardId) {
        this.guessed()

      } else {
        this.misesCounter.emit(1);
      }

      this.isPaused = true;
      this.movesCounter.emit(1);
      this.resetCurrentMove();
      this.counter--;

      if (this.counter === 0 || this.cardsGuessed === this.cardsToGuessed) {
        this.gameOver()
      }
    }
  }

  gameOver() {

    if (this.gameIsOver) {
      return;
    }

    this.gameIsOver = true;

    if (this.cardsGuessed === this.cardsToGuessed) {
      this.hasWin.emit();

    } else {
      this.hasLose.emit();
    }
  }

  guessed() {
    this.firstCard?.classList.add('card--guessed')
    this.secondCard?.classList.add('card--guessed')

    this.cardsGuessed++;
  }

  resetCurrentMove() {
    setTimeout(() => {
      this.firstCard?.classList.remove('card--picked')
      this.secondCard?.classList.remove('card--picked')

      this.firstCardId = '';
      this.secondCardId = '';
      this.firstCard = undefined;
      this.secondCard = undefined;

      this.isPaused = false;
    }, 900);
  }

  resetAll() {
    this.memoryService.setResetCantonsGame(false);
    this.counter = this.cards.length;
    this.cardsGuessed = 0;
    this.gameIsOver = false;

    if (this.gridcontainer.nativeElement) {
      this.gridcontainer.nativeElement.querySelectorAll('.card').forEach((card: HTMLDivElement) => {
        card.classList.remove('card--picked');
        card.classList.remove('card--guessed');
      })
    }
  }
}
