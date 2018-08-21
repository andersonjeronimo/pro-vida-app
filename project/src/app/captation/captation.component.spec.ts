import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptationComponent } from './captation.component';

describe('CaptationComponent', () => {
  let component: CaptationComponent;
  let fixture: ComponentFixture<CaptationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
