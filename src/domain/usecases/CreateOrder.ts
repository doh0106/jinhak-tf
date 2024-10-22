import { Book } from '../entities/Book';
import { Order } from '../entities/Order';
import { BookRepository } from '../repositories/BookRepository';
import { OrderRepository } from '../repositories/OrderRepository';

export class CreateOrderUseCase {
  constructor(
    private bookRepository: BookRepository,
    private orderRepository: OrderRepository
  ) {}

  async execute(bookId: string, quantity: number): Promise<Order> {
    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new Error('Book not found');
    }

    if (!book.canBePurchased(quantity)) {
      throw new Error('Not enough stock');
    }

    const totalPrice = book.price * quantity;
    const order = new Order(
      Date.now().toString(),
      book,
      quantity,
      totalPrice,
      new Date()
    );

    await this.bookRepository.updateStock(book.id, book.stockQuantity - quantity);
    return this.orderRepository.save(order);
  }
}
