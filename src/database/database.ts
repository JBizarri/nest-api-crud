import { User } from '@users/entities/user.entity';

export interface Table<T> {
  currentPk: number;
  data: T[];
}

export interface IDatabase {
  tables: {
    user: Table<User>;
  };
}

export const DATABASE: IDatabase = {
  tables: {
    user: {
      currentPk: 1,
      data: [],
    },
  },
};
