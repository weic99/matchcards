import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matchcardsboard',
  templateUrl: './matchcardsboard.component.html',
  styleUrls: ['./matchcardsboard.component.css']
})
export class MatchcardsboardComponent implements OnInit {
  private cards: any[];
  private totalPairs: number;
  private pairsFound: number;
  private firstCardSelected: any;
  private isAcceptingInput: boolean;
  private gameEnded: boolean;
  
  constructor() { }

  ngOnInit() {
    this.isAcceptingInput = true;
    this.gameEnded = false;
    this.firstCardSelected = undefined;
    this.pairsFound = 0;
    this.totalPairs = 3;
    this.cards = [];
    for (let i = 0; i < this.totalPairs; i++) {
      let card = {
        number: i,
        isRevealed: false
      };
      this.cards.push(card);
      this.cards.push(Object.assign({}, card));
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
    if (this.gameEnded || !this.isAcceptingInput || card === this.firstCardSelected) {
      return;
    } 
    console.log('clicked', card);
    card.isRevealed = true;
    if (this.firstCardSelected) {
      this.isAcceptingInput = false;
      setTimeout(() => {
        this.isAcceptingInput = true;
      }, 1000);
      if (this.firstCardSelected.number === card.number) {
        if (++this.pairsFound === this.totalPairs) {
          this.gameEnded = true;
        }
        console.log("matched", this.pairsFound);
        this.firstCardSelected = undefined;

      } else {
        setTimeout(() => {
          this.firstCardSelected.isRevealed = false;
          card.isRevealed = false;
          this.firstCardSelected = undefined;
        }, 750);
      }
    } else {
      this.firstCardSelected = card;
    } 
    console.log('first card', this.firstCardSelected);
  }
}
