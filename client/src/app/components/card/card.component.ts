import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  private clicked: boolean;
  
  constructor() { }

  ngOnInit() {
    this.clicked = false;
  }
  
  onClick() {
    this.clicked = true;
    setTimeout(() => {
      this.clicked = false;
    }, 2000);
  }
}
