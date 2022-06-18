import _ from 'lodash';
import { DATABASE, Table } from './database';
import { BaseEntity } from './entity';

export class BaseDao<T extends BaseEntity> {
  private table: Table<T>;

  constructor(tablename: string) {
    this.table = DATABASE.tables[tablename];
  }

  list(): T[] {
    return this.table.data.slice();
  }

  find(id: number): T {
    return this.table.data.find((user) => user.id === id);
  }

  delete(id: number): void {
    _.remove(this.table.data, (user) => user.id === id);
  }

  save(obj: T): T {
    if (obj.id) {
      this.update(obj);
    } else {
      this.create(obj);
    }
    return obj;
  }

  private update(obj: T): T {
    this.table.data.splice(
      this.table.data.findIndex((user) => user.id === obj.id),
      1,
      obj,
    );
    return obj;
  }

  private create(obj: T): T {
    obj.id = this.table.currentPk++;
    this.table.data.push(obj);
    return obj;
  }
}
