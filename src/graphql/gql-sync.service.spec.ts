import { TestBed } from '@angular/core/testing';

import { GqlSyncService } from './gql-sync.service';

describe('GraphqlSyncService', () => {
  let service: GqlSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GqlSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
