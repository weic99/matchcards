import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matchcardsboard',
  templateUrl: './matchcardsboard.component.html',
  styleUrls: ['./matchcardsboard.component.css']
})
export class MatchcardsboardComponent implements OnInit {
  private cards: any[];
  
  constructor() { }

  ngOnInit() {
    this.cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  }
  
}
