import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchcardsboardComponent } from './matchcardsboard.component';

describe('MatchcardsboardComponent', () => {
  let component: MatchcardsboardComponent;
  let fixture: ComponentFixture<MatchcardsboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchcardsboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchcardsboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
