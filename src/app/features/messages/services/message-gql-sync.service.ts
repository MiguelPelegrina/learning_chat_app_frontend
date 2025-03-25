import { inject, Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import {
  Message,
  MessageStatus,
  PostMessageGQL,
  PostMessageMutationVariables,
} from '../../../../graphql/generated/graphql';
import { GqlSyncService } from '../../../../graphql/gql-sync.service';
import { MessagesStore } from '../messages.store';
import { MessageDbService } from './message-db.service';

@Injectable({
  providedIn: 'root',
})
export class MessageGqlSyncService extends GqlSyncService<Message> {
  private messagesStore = inject(MessagesStore);

  constructor(
    private dbService: MessageDbService,
    private postMessageGQL: PostMessageGQL
  ) {
    super();
    this.subscribeToNewMessages();
  }

  subscribeToNewMessages() {
    console.log('Subscribing to new messages');
    this.apollo
      .subscribe<{ onNewMessage: Message }>({
        query: gql`
          subscription OnNewMessage {
            onNewMessage {
              id
              content
              status
              timestamp
            }
          }
        `,
      })
      .subscribe(({ data }) => {
        console.log('on new subscription');
        if (data?.onNewMessage) {
          console.log('new message', data.onNewMessage);
          this.dbService.update(data.onNewMessage).subscribe(() => {
            this.messagesStore.putMessage(data.onNewMessage);
          });
        }
      });
  }

  sendMessage(content: string) {
    const message: Message = {
      id: uuidv4(),
      content,
      status: MessageStatus.NotSent,
      timestamp: new Date().toISOString(),
    };

    // 1. Save to IndexedDB first
    this.dbService.add(message).subscribe(() => {
      // 2. Try sending to backend
      this.messagesStore.addMessage(message);

      this.pushMessageToServer(message).subscribe({
        next: response => {
          console.log('Mutation successful:', response);
        },
        error: error => {
          console.error('Mutation failed:', error);
        },
      });
    });
  }

  pushMessageToServer(message: Message): Observable<any> {
    const variables: PostMessageMutationVariables = {
      id: message.id,
      content: message.content,
      timestamp: message.timestamp,
    };
    console.log('Sending mutation with variables:', variables);

    return this.postMessageGQL.mutate(variables).pipe(
      tap(response => console.log('Mutation response:', response)),
      catchError(error => {
        console.error('Mutation error:', error);
        return throwError(() => error);
      })
    );
  }
}
