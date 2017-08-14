import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeselectionComponent } from './modeselection.component';

describe('ModeselectionComponent', () => {
  let component: ModeselectionComponent;
  let fixture: ComponentFixture<ModeselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
