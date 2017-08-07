import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matchcardsboard',
  templateUrl: './matchcardsboard.component.html',
  styleUrls: ['./matchcardsboard.component.css']
})
export class MatchcardsboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  private login() {
    this.router.navigate(['/login']);
  }
}
