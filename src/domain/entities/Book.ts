export class Book {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly price: number,
    public readonly stockQuantity: number
  ) {}

  canBePurchased(quantity: number): boolean {
    return this.stockQuantity >= quantity;
  }
}
