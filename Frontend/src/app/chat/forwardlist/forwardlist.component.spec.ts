import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardlistComponent } from './forwardlist.component';

describe('ForwardlistComponent', () => {
  let component: ForwardlistComponent;
  let fixture: ComponentFixture<ForwardlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwardlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
