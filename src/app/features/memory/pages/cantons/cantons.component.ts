import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from '../../components/score/score.component';

import cantons from "../../data/cantons.json";
import { GridComponent } from '../../components/grid/grid.component';
import { MemoryService } from '../../services/memory.service';
import { GlobalService } from '../../../../shared/services/global.service';

@Component({
  selector: 'app-cantons',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule, MatButtonModule, MatDividerModule,
    ScoreComponent, ModalComponent,
    GridComponent
  ],
  templateUrl: './cantons.component.html',
  styleUrl: './cantons.component.scss'
})
export class CantonsComponent implements OnInit {


  /***********configs************/
  CARDS: any = cantons;
  maxCardsToDraw: number = 7;
  /***********configs************/

  // init
  currentCards: any = [];
  cards = {};
  moves: number = 0;
  missed: number = 0;

  // init modal
  modalTitle = '';
  modalContent = '';
  modalButton = 'Play Again';

  // dom
  @ViewChild('pagememorycontent') pagememorycontent!: ElementRef;
  @ViewChild('modal') modalComponent!: ModalComponent;

  constructor(private memoryService: MemoryService, private globalService: GlobalService) {
  }


  ngOnInit(): void {
    this.initCards();
  }


  initCards() {

    console.log('initCards');

    this.missed = 0;
    this.moves = 0;

    if (this.CARDS) {
      this.CARDS = this.globalService.shuffle(this.CARDS);
      let shuffledCards: any[] = [];
      this.CARDS.slice([0], [this.maxCardsToDraw]).map((item: any, i: any) => {
        shuffledCards.push(item);
      });
      this.currentCards = [...shuffledCards, ...shuffledCards];
      this.cards = this.currentCards;
    }
  }

  modalAction(action: string) {
    if (action === 'PLAY_AGAIN') {
      this.playAgain();
    }
  }

  hasLose() {
    this.modalTitle = "Lose! 😢😩";
    this.modalContent = "Sorry maybee next time. 🚀";
    this.modalComponent.modal!.nativeElement.classList.add("modal--open");
  }

  hasWin() {
    this.modalTitle = "Win! 🙌🥳";
    this.modalContent = "Good job, you win. 🚀";
    this.modalComponent.modal!.nativeElement.classList.add("modal--open");
  }

  movesCounter() {
    this.moves++;
  }
  misesCounter() {
    this.missed++;
  }

  playAgain() {
    this.memoryService.setResetCantonsGame(true);
    this.closeModal();
    this.initCards();
  }

  closeModal() {
    this.modalComponent.modal.nativeElement.classList.remove("modal--open");
  }

}
