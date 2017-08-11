import { Component, OnInit } from '@angular/core';
import { MongoService } from '../../services/mongo.service';

@Component({
  selector: 'app-matchcardsboard',
  templateUrl: './matchcardsboard.component.html',
  styleUrls: ['./matchcardsboard.component.css']
})
export class MatchcardsboardComponent implements OnInit {
  private pokemons: any[]; /*all the pokemon data*/
  private totalPairs: number; /*total number of pairs*/
  private pairsFound: number; /*total number of pairs found*/
  private firstCardSelected: any; /*first card of the pair to be matched*/
  private isAcceptingInput: boolean; /*blocks more clicks when false*/
  private audio: HTMLAudioElement; /*player for playing pokemon cry*/
  private audioSrc: HTMLElement; /*source for the player*/
  private titleMsg: string; /*Message to display on the title bar*/

  public gameEnded: boolean; /*ends the game when true*/
  public cry: string; /*url for pokemon cry*/
  public cards: any[]; /*all cards on the game board*/

  constructor(
    private mongo: MongoService
  ) { }

  ngOnInit() {
    this.titleMsg = "Select Total Pairs"
    // this.isAcceptingInput = true;
    // this.gameEnded = false;
    // this.firstCardSelected = undefined;
    // this.pairsFound = 0;
    this.mongo.getAllPokemons()
      .then(pokemons => {
        this.pokemons = Array.from(pokemons);
        //this.generateDeck(3);
      });
    this.cry = "";
    this.audio = <HTMLAudioElement>document.getElementById('cry');
    this.audioSrc = document.getElementById('cry-src');
    this.audio.volume = 0.25;
  }

  public onPairsSelect(e) {
    this.generateDeck(Number(e.target.value));

    /** set game states */
    this.pairsFound = 0;
    this.gameEnded = false;
    this.isAcceptingInput = true;
    this.firstCardSelected = undefined;

    this.titleMsg = 'Play!';
  }

  private generateDeck(num: number) {
    this.totalPairs = num;
    this.cards = [];

    let shuffledPokemonArray = this.shuffle(this.pokemons.slice());
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

    // play the pokemon cry
    this.cry = card.cry;
    this.audio.load();
    this.audio.play();

    //if first card is selected
    if (this.firstCardSelected) {
      this.isAcceptingInput = false;
      setTimeout(() => {
        this.isAcceptingInput = true;
      }, 1000);

      // if two cards are matching
      if (this.firstCardSelected.number === card.number) {

        // // play the pokemon cry
        // this.cry = card.cry;
        // this.audio.load();
        // this.audio.play();

        // if all pairs are found, end the game
        if (++this.pairsFound === this.totalPairs) {
          this.titleMsg = "You Win! Play Again?"
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
