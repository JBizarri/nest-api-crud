export class BaseEntity {
  id: number;

  static get tablename() {
    return this.name
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase();
  }
}
