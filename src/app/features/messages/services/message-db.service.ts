import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Message } from '../../../../graphql/generated/graphql';
import { BaseDatabaseService } from '../../shared/database/base-database.service';

@Injectable({
  providedIn: 'root',
})
export class MessageDbService extends BaseDatabaseService<Message> {
  constructor() {
    super('messages');
  }

  // TODO Abstract
  getSortedMessages(): Observable<Message[]> {
    return this.dbService
      .getAll<Message>('messages')
      .pipe(
        map((messages: Message[]) =>
          messages.sort(
            (a, b) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          )
        )
      );
  }
}
