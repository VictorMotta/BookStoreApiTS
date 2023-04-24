// tabela do banco
export type UserEntity = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type User = Partial<UserEntity>;

export type BookEntity = {
  id: number;
  name: string;
  author: string;
  available: boolean;
};

export type findAllMyBooks = Omit<BookEntity, 'id' | 'available'>;

export type createNewBook = Partial<BookEntity>;

export type FindAllBooks = {
  id: number;
  name: string;
  author: string;
  available: boolean;
  createdBy: string;
};

export type TakenBook = {
  id: number;
  User: {
    name: string;
  };
  Book: {
    name: string;
    author: string;
  };
};

export type BookAndCreator = {
  id: number;
  available: boolean;
  name: string;
  author: string;
  User: {
    name: string;
  };
};
