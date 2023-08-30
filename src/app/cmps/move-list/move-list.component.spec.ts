import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveListcComponent } from './move-list.component';

describe('MoveListcComponent', () => {
  let component: MoveListcComponent;
  let fixture: ComponentFixture<MoveListcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoveListcComponent]
    });
    fixture = TestBed.createComponent(MoveListcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
