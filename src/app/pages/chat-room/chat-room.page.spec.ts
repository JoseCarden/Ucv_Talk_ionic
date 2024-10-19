import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatRoomPage } from './chat-room.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ChatRoomPage', () => {
  let component: ChatRoomPage;
  let fixture: ComponentFixture<ChatRoomPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
