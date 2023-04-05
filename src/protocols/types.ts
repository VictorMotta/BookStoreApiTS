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
