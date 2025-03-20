import { inject, Injectable } from '@angular/core';
import { Message, MessageStatus, PostMessageGQL, PostMessageMutationVariables } from '../../../../graphql/generated/graphql';
import { GqlSyncService } from '../../../../graphql/gql-sync.service';
import { MessageDbService } from './message-db.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { gql } from 'apollo-angular';
import { MessagesStore } from '../messages.store';

@Injectable({
  providedIn: 'root'
})
export class MessageGqlSyncService extends GqlSyncService<Message>{
  private messagesStore = inject(MessagesStore);

  constructor(private dbService: MessageDbService, private postMessageGQL: PostMessageGQL) {
    super();
    this.subscribeToNewMessages();
  }

  subscribeToNewMessages() {
    this.apollo.subscribe<{ onNewMessage: Message }>({
      query: gql`
        subscription OnNewMessage {
          onNewMessage {
            id content status
          }
        }
      `
    }).subscribe(({ data }) => {
      if (data?.onNewMessage) {
        this.dbService.add(data.onNewMessage).subscribe(() => {
          this.messagesStore.addMessage(data.onNewMessage);
        });
      }
    });
  }

  sendMessage(content: string) {
    const message: Message = { content, status: MessageStatus.NotSent };

    // 1. Save to IndexedDB first
    this.dbService.add(message).subscribe(savedId => {
      message.id = savedId.id; // Assign database ID

      // 2. Try sending to backend
      this.messagesStore.addMessage(message);

      // TODO Update message in db if sent
      if(message.content){
        this.pushMessageToServer(message.content).subscribe({
          next: (response) => {
            console.log('Mutation successful:', response);
          },
          error: (error) => {
            console.error('Mutation failed:', error);
          }
        });
      }
    });
  }

  pushMessageToServer(content: string): Observable<any> {
    const variables: PostMessageMutationVariables = { content };
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
