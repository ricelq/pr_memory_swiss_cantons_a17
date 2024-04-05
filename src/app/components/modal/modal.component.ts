import { Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatIconModule, MatButtonModule, MatDividerModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  // const
  PLAY_AGAIN: string = 'PLAY_AGAIN';

  // inputs from parent component
  @Input() title: string = ''
  @Input() content: string = ''
  @Input() button: string = ''

  // emitters
  @Output() modalAction = new EventEmitter();

  // dom
  @ViewChild('modal') modal!: ElementRef;

  closeModal() {
    this.modal!.nativeElement.classList.remove("modal--open");
  }

  playAgain() {
    this.modalAction.emit(this.PLAY_AGAIN);
    this.closeModal();
  }


}
