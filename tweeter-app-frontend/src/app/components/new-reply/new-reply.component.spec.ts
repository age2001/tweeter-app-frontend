import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReplyComponent } from './new-reply.component';

describe('NewReplyComponent', () => {
  let component: NewReplyComponent;
  let fixture: ComponentFixture<NewReplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewReplyComponent]
    });
    fixture = TestBed.createComponent(NewReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
