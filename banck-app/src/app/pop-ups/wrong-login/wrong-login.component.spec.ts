import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongLoginComponent } from './wrong-login.component';

describe('WrongLoginComponent', () => {
  let component: WrongLoginComponent;
  let fixture: ComponentFixture<WrongLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrongLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrongLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
