import { inject, Injectable } from '@angular/core';
import { NgxIndexedDBService, WithID } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseDatabaseService<T> {
  protected dbService: NgxIndexedDBService = inject(NgxIndexedDBService);

  constructor(private storeName: string) {}

  add(item: T): Observable<T & WithID> {
    return this.dbService.add(this.storeName, item);
  }

  getAll(): Observable<T[]> {
    return this.dbService.getAll(this.storeName);
  }

  getById(id: number): Observable<T | undefined> {
    return this.dbService.getByID(this.storeName, id);
  }

  update(item: T & { id: number }): Observable<T & WithID> {
    return this.dbService.update(this.storeName, item);
  }

  delete(id: number): Observable<unknown[]> {
    return this.dbService.delete(this.storeName, id);
  }
}
