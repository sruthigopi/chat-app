import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatheaderComponent } from './chatheader.component';

describe('ChatheaderComponent', () => {
  let component: ChatheaderComponent;
  let fixture: ComponentFixture<ChatheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
