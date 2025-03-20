import { TestBed } from '@angular/core/testing';

import { MessageGqlSyncService } from './message-gql-sync.service';

describe('MessageGqlSyncService', () => {
  let service: MessageGqlSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageGqlSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
