import { Book } from './Book';

export class Order {
  constructor(
    public readonly id: string,
    public readonly book: Book,
    public readonly quantity: number,
    public readonly totalPrice: number,
    public readonly orderDate: Date
  ) {}
}
