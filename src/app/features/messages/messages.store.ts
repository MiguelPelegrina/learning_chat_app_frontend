import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Message } from '../../../graphql/generated/graphql';
import { MessageDbService } from './services/message-db.service';

type MessagesState = {
  messages: Message[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: MessagesState = {
  messages: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

// TODO
// - Abstract
export const MessagesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, dbService = inject(MessageDbService)) => ({
    async loadMessages() {
      patchState(store, { isLoading: true });

      dbService.getAll().subscribe(messages => {
        patchState(store, { messages, isLoading: false });
      });
    },

    addMessage(message: Message) {
      patchState(store, state => ({ messages: [...state.messages, message] }));
    },

    updateMessage(updatedMessage: Message) {
      patchState(store, state => ({
        messages: state.messages.map(m =>
          m.id === updatedMessage.id ? updatedMessage : m
        ),
      }));
    },

    deleteMessage(messageId: string) {
      patchState(store, state => ({
        messages: state.messages.filter(m => m.id !== messageId),
      }));
    },

    putMessage(message: Message & { id: string }) {
      patchState(store, state => ({
        messages: state.messages.some(m => m.id === message.id)
          ? state.messages.map(m => (m.id === message.id ? message : m))
          : [...state.messages, message],
      }));
    },
  }))
);
