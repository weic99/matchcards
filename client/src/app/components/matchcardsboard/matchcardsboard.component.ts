import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matchcardsboard',
  templateUrl: './matchcardsboard.component.html',
  styleUrls: ['./matchcardsboard.component.css']
})
export class MatchcardsboardComponent implements OnInit {
  private cards: any[];
  private cardCount: number;
  private turn: number;
  
  constructor() { }

  ngOnInit() {
    this.cardCount = 12;
    this.cards = [];
    for (let i = 0; i < this.cardCount; i++) {
      this.cards.push(i);
      this.cards.push(i);
    }
    
    this.shuffle(this.cards);
  }
  
  private shuffle(array) {
    let currentIndex = array.length;
    let temp;
    let randomIndex;
    
    while (currentIndex-- !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
  }
  
  private onSelected(card: any) {
    console.log(card);
  }
}
