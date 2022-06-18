import { BaseDao } from './dao';
import { BaseEntity } from './entity';

export class BaseRepository<T extends BaseEntity, K extends BaseDao<T>> {
  protected dao: K;

  constructor(dao: K) {
    this.dao = dao;
  }

  list(): T[] {
    return this.dao.list();
  }

  find(id: number): T {
    return this.dao.find(id);
  }

  delete(id: number): void {
    this.dao.delete(id);
  }

  save(obj: T): T {
    return this.dao.save(obj);
  }
}
