
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { split, HttpLink } from '@apollo/client/core';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { environment } from './src/environments/environment.development';

// HTTP Link (for Queries & Mutations)
const httpLink = new HttpLink({
  uri: environment.httpUri,
});

// WebSocket Link (for Subscriptions)
const wsLink = new GraphQLWsLink(createClient({
  url: environment.wsUri,
  // connectionParams: {
  //   authToken: localStorage.getItem('token'), // Pass auth if needed
  // },
}));

// Use WebSockets for subscriptions, HTTP for everything else
export const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);
