import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {


  private resetCantonsGameSubject = new BehaviorSubject(false);
  resetCantonsGame = this.resetCantonsGameSubject.asObservable();


  constructor() { }

  setResetCantonsGame(resetCantonsGame: boolean) {
    this.resetCantonsGameSubject.next(resetCantonsGame)
  }

}
