import { Component, OnInit } from '@angular/core';
import { MongoService } from '../../services/mongo.service';

@Component({
  selector: 'app-matchcardsboard',
  templateUrl: './matchcardsboard.component.html',
  styleUrls: ['./matchcardsboard.component.css']
})
export class MatchcardsboardComponent implements OnInit {
  private pokemons: any[];
  private cards: any[];
  private totalPairs: number;
  private pairsFound: number;
  private firstCardSelected: any;
  private isAcceptingInput: boolean;
  private gameEnded: boolean;
  private cry: string;
  
  constructor(
    private mongo: MongoService
  ) { }

  ngOnInit() {
    this.isAcceptingInput = true;
    this.gameEnded = false;
    this.firstCardSelected = undefined;
    this.pairsFound = 0;
    this.mongo.getAllPokemons()
      .then(pokemons => {
        this.pokemons = Array.from(pokemons);
        this.generateDeck(3);    
      });
  }
  
  private generateDeck(num: number) {
    this.totalPairs = num;
    this.cards = [];
    
    let shuffledPokemonArray = this.shuffle(this.pokemons.slice()).slice(0, this.totalPairs);
    for (let i = 0; i < this.totalPairs; i++) {
      let randomPokemon = shuffledPokemonArray.pop();
      let card = {
        number: i,
        name: randomPokemon.name,
        imageUrl: randomPokemon.imageUrl,
        pokeNumber: randomPokemon.number,
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
    
    return array;
  }
  
  private onSelected(card: any) {
    if (this.gameEnded || !this.isAcceptingInput || card === this.firstCardSelected) {
      return;
    } 
    
    //reveal the clicked card
    card.isRevealed = true;
    
    //if first card is selected
    if (this.firstCardSelected) {
      this.isAcceptingInput = false;
      setTimeout(() => {
        this.isAcceptingInput = true;
      }, 1000);
      
      // if two cards are matching
      if (this.firstCardSelected.number === card.number) {
        
        this.cry = card.cry;
        console.log('card.cry', card.cry);
        let sound = <HTMLAudioElement>document.getElementById('cry');
        let source = document.getElementById('cry-src');
        sound.volume = 0.25;
        sound.load();
        sound.play();
        // if all pairs are found, end the game
        if (++this.pairsFound === this.totalPairs) {
          this.gameEnded = true;
        }
        
        // set first card to undefined
        this.firstCardSelected = undefined;
        
        // if two cards do not match
      } else {
        setTimeout(() => {
          this.firstCardSelected.isRevealed = false;
          card.isRevealed = false;
          this.firstCardSelected = undefined;
        }, 750);
      }
      
    // if first card not selected, set it  
    } else {
      this.firstCardSelected = card;
    } 

  }
}
