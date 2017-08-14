import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modeselection',
  templateUrl: './modeselection.component.html',
  styleUrls: ['./modeselection.component.css']
})
export class ModeselectionComponent implements OnInit {
  public titleMsg: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.titleMsg = 'Select Game Mode'
  }

  onModeSelect(e) {
    if (e && e.target.value === 'single') {
      this.goToRoute('/matchcards');
    }
  }

  private goToRoute(str: string) {
    // this.success = true;
    // this.setMessage('Logging in...');
    // this.showLogin = false;
    setTimeout(() => {
      this.router.navigate([str]);
    }, 1000);
  }
}
