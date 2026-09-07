import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private readyPromise: Promise<void>;

  constructor(private storage: Storage) {
    this.readyPromise = this.init();
  }

  private async init(): Promise<void> {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  private async ready(): Promise<Storage> {
    if (!this._storage) {
      await this.readyPromise;
    }
    return this._storage as Storage;
  }

  async set(key: string, value: any): Promise<void> {
    const storage = await this.ready();
    await storage.set(key, value);
  }

  async get(key: string): Promise<any> {
    const storage = await this.ready();
    return await storage.get(key);
  }

  async remove(key: string): Promise<void> {
    const storage = await this.ready();
    await storage.remove(key);
  }

  async clear(): Promise<void> {
    const storage = await this.ready();
    await storage.clear();
  }

  async keys(): Promise<string[]> {
    const storage = await this.ready();
    return (await storage.keys()) ?? [];
  }
}
