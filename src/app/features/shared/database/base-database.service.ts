import { inject, Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseDatabaseService<T> {
  protected dbService: NgxIndexedDBService = inject(NgxIndexedDBService);

  constructor(protected storeName: string) {}

  add(item: T): Observable<T> {
    return this.dbService.add(this.storeName, item);
  }

  getAll(): Observable<T[]> {
    return this.dbService.getAll(this.storeName);
  }

  getById(id: string): Observable<T | undefined> {
    return this.dbService.getByID(this.storeName, id);
  }

  update(item: T & { id: string }): Observable<T> {
    return this.dbService.update(this.storeName, item);
  }

  delete(id: string): Observable<unknown[]> {
    return this.dbService.delete(this.storeName, id);
  }
}
