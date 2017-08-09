import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: any;
  @Output() onSelected = new EventEmitter<any>();
  
  private defaultImageUrl: string;
  private clicked: boolean;
  
  constructor() { }

  ngOnInit() {
    this.clicked = false;
    this.defaultImageUrl = "https://firebasestorage.googleapis.com/v0/b/matchcards-7d5da.appspot.com/o/pokemon%2Fpokeball.png?alt=media&token=4361533e-eac5-4d3e-8193-9702b4ad7a90";
  }
  
  onClick(clicked: boolean) {
    // this.clicked = true;
    // setTimeout(() => {
    //   this.clicked = false;
    // }, 2000);
    
    this.onSelected.emit(this.card);
  }
}
