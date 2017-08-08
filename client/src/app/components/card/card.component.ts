import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: any;
  @Output() onSelected = new EventEmitter<any>();
  
  private imageUrl: string = "https://firebasestorage.googleapis.com/v0/b/matchcards-7d5da.appspot.com/o/pokemon%2FQuestionMark.png?alt=media&token=ad883b8a-b08c-4c7d-be32-0ba6fe9459ac";
  
  private clicked: boolean;
  
  constructor() { }

  ngOnInit() {
    this.clicked = false;
  }
  
  onClick(clicked: boolean) {
    // this.clicked = true;
    // setTimeout(() => {
    //   this.clicked = false;
    // }, 2000);
    
    this.onSelected.emit(this.card);
  }
}
