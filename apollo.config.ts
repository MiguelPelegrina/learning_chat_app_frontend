import { HttpLink, split } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { environment } from './src/environments/environment.development';

// HTTP Link (for Queries & Mutations)
const httpLink = new HttpLink({
  uri: environment.httpUri,
});

const createWsLink = () => {
  return new GraphQLWsLink(
    createClient({
      url: environment.wsUri,
      retryAttempts: Infinity, // Keep retrying indefinitely
      shouldRetry: () => true, // Always attempt to retry
      // connectionParams: async () => ({
      //   authToken: localStorage.getItem('token'), // Pass auth if needed
      // }),
      on: {
        opened: event => {
          console.log('Websocket opened', event);
        },
        closed: event => {
          console.warn('WebSocket closed, attempting to reconnect...', event);
          setTimeout(() => {
            wsLink = createWsLink(); // Recreate the WebSocket link
          }, 3000); // Wait before attempting to reconnect
        },
      },
    })
  );
};

let wsLink = createWsLink();

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
