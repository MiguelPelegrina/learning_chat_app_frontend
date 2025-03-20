import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import gql from 'graphql-tag';


@Injectable({
  providedIn: 'root'
})
export abstract class GqlSyncService<T> {
  protected apollo: Apollo = inject(Apollo);

  fetchData(query: string): Observable<T[]> {
    return this.apollo.watchQuery({ query: gql`${query}` })
      .valueChanges.pipe(map((result: any) => result.data));
  }

  pushData(mutation: string, variables: Record<string, unknown>): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`${mutation}`,
      variables
    });
  }
}
