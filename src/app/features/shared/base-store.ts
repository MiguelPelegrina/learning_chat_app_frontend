import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type BaseState<T> = {
  items: T[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialBaseState = <T>(): BaseState<T> => ({
  items: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
});

export class BaseStore<T extends { id: string }> {
  protected store = signalStore(
    {},
    withState(initialBaseState<T>()),
    withMethods(state => ({
      async loadItems(dbService: { getAll: () => any }) {
        patchState(state, { isLoading: true });
        dbService.getAll().subscribe((items: T[]) => {
          patchState(state, { items, isLoading: false });
        });
      },

      addItem(item: T) {
        patchState(state, s => ({ items: [...s.items, item] }));
      },

      updateItem(updatedItem: T) {
        patchState(state, s => ({
          items: s.items.map(i => (i.id === updatedItem.id ? updatedItem : i)),
        }));
      },

      deleteItem(itemId: string) {
        patchState(state, s => ({
          items: s.items.filter(i => i.id !== itemId),
        }));
      },

      // ✅ Implement put() (adds if missing, updates otherwise)
      putItem(item: T) {
        patchState(state, s => ({
          items: s.items.some(i => i.id === item.id)
            ? s.items.map(i => (i.id === item.id ? item : i)) // Update
            : [...s.items, item], // Add
        }));
      },
    }))
  );

  get items() {
    return this.store.items();
  }
}
