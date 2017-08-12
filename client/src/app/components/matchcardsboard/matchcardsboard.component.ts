import { Component, OnInit, NgZone } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

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
  private el: HTMLElement;

  public gameEnded: boolean; /*ends the game when true*/
  public cry: string; /*url for pokemon cry*/
  public cards: any[]; /*all cards on the game board*/
  public hideScrollIndicators: boolean;

  constructor(
    private firebase: FirebaseService,
    private zone: NgZone
  ) {

    /** detect window resize and show/hide scroll indicators*/
    window.onresize = (e) => {
      this.zone.run(() => {
        this.showScrollbars();
      });
    };
  }

  ngOnInit() {
    this.el = document.getElementById('match-cards-board');
    this.hideScrollIndicators = true;
    this.titleMsg = "Select Total Pairs"

    /** fetch all the pokemon data */
    this.firebase.getAllPokemons()
      .then(pokemons => {
        this.pokemons = pokemons;
      });

    /** set the audio player for pokemon cries */
    this.cry = "";
    this.audio = <HTMLAudioElement>document.getElementById('cry');
    this.audioSrc = document.getElementById('cry-src');
    //this.audio.volume = 0.5;
  }

  ngAfterContentChecked() {
    /** hide/show scroll indicators */
    this.showScrollbars();
  }

  /** detect overflow hide/show scroll indicators */
  private showScrollbars(el = this.el){
    let limit = (el.scrollHeight - el.clientHeight) - 75;
    if (limit <= el.scrollTop) {
      this.hideScrollIndicators = true;
    } else {
      this.hideScrollIndicators = false;
    }
  }

  /** initialize the game */
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
    let set = new Set();

    /** generate random unique integers from 0 to total pokemons */
    while (set.size < this.totalPairs) {
      set.add(Math.round(Math.random() * this.pokemons.length));
    }

    /** generate cards for the deck */
    set.forEach(n =>{
      let randomPokemon = this.pokemons[n];
      let card = {
        name: randomPokemon.name,
        imageUrl: randomPokemon.imageUrl,
        pokeNumber: randomPokemon.number,
        isRevealed: false
      };
      this.cards.push(card);
      this.cards.push(Object.assign({}, card));
    });

    /** shuffle deck */
    this.shuffle(this.cards);
  }

  /** shuffle an array */
  private shuffle(array) {console.log('shuffle', array);
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

  /** when a card is clicked */
  private onSelected(card: any) {

    if (this.isAcceptingInput) {
      /** play the pokemon cry */
      this.cry = card.cry;
      this.audio.load();
      this.audio.play();
    }

    if (this.gameEnded  /** game has ended */
      || !this.isAcceptingInput /** delaying next input */
      || card.isRevealed /** prevents picking matching same card or already matched */
    ) {
      return;
    }

    /** reveal the clicked card */
    card.isRevealed = true;

    /** if first card is selected */
    if (this.firstCardSelected) {
      this.isAcceptingInput = false;
      setTimeout(() => {
        this.isAcceptingInput = true;
      }, 1000);

      /** if two cards are matching */
      if (this.firstCardSelected.pokeNumber === card.pokeNumber) {

        /** if all pairs are found, end the game */
        if (++this.pairsFound === this.totalPairs) {
          this.titleMsg = "You Win! Play Again?"
          this.gameEnded = true;
        }

        /** set first card to undefined */
        this.firstCardSelected = undefined;

        /** if two cards do not match, reset matching */
      } else {
        setTimeout(() => {
          this.firstCardSelected.isRevealed = false;
          card.isRevealed = false;
          this.firstCardSelected = undefined;
        }, 750);
      }

    /** if first card not selected, set it */
    } else {
      this.firstCardSelected = card;
    }

  }
}
