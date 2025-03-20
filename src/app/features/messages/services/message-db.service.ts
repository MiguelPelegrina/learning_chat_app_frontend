import { Injectable } from '@angular/core';
import { BaseDatabaseService } from '../../shared/database/base-database.service';
import { Message } from '../../../../graphql/generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class MessageDbService extends BaseDatabaseService<Message>{
  constructor() {
    super('messages');
  }
}
