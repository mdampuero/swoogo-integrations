import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCopyComponent } from './btn-copy.component';

describe('BtnCopyComponent', () => {
  let component: BtnCopyComponent;
  let fixture: ComponentFixture<BtnCopyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnCopyComponent]
    });
    fixture = TestBed.createComponent(BtnCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
