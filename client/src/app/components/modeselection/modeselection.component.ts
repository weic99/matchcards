import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modeselection',
  templateUrl: './modeselection.component.html',
  styleUrls: ['./modeselection.component.css']
})
export class ModeselectionComponent implements OnInit {
  public titleMsg: string;
  public clickMsg: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.titleMsg = 'Select Game Mode';
  }

  onModeSelect(e) {
    if (e.target.value === 'single') {
      this.goToRoute('/matchcards');
    } else if (e.target.value === 'pvp') {
      this.clickMsg = 'Coming soon...';
      setTimeout(() => {
        this.clickMsg = '';
      }, 2000);
    }
  }

  private goToRoute(str: string, delay: number = 300) {
    // this.success = true;
    // this.setMessage('Logging in...');
    // this.showLogin = false;
    setTimeout(() => {
      this.router.navigate([str]);
    }, delay);
  }
}
