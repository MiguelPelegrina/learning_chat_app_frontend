import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MessagesStore } from '../../messages.store';
import { MessageGqlSyncService } from '../../services/message-gql-sync.service';
import { MessageAddComponent } from '../message-add/message-add.component';
import { MessageListComponent } from '../message-list/message-list.component';

@Component({
  selector: 'app-message',
  imports: [MessageAddComponent, MessageListComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessagePageComponent implements OnInit {
  readonly store = inject(MessagesStore);
  protected httpClient = inject(HttpClient);

  constructor(private messageSyncService: MessageGqlSyncService) {}

  ngOnInit(): void {
    this.store.loadMessages();
  }

  sendMessage(content: string) {
    this.messageSyncService.sendMessage(content);
  }
}
