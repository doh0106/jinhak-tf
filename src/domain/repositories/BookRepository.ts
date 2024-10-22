import { Book } from '../entities/Book';

export interface BookRepository {
  findById(id: string): Promise<Book | null>;
  updateStock(id: string, newQuantity: number): Promise<void>;
}
