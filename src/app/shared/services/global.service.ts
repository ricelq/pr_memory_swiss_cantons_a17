import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
  shuffle(array: []): [] {

    let counter = array.length,
      temp,
      index;

    while (counter > 0) {
      index = Math.floor(Math.random() * counter);
      counter--;
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
    ;
  }
}
