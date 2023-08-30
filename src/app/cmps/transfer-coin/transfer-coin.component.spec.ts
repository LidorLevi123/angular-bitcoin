import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCoinComponent } from './transfer-coin.component';

describe('TransferCoinComponent', () => {
  let component: TransferCoinComponent;
  let fixture: ComponentFixture<TransferCoinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferCoinComponent]
    });
    fixture = TestBed.createComponent(TransferCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
