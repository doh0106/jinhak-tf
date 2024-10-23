## **1. 개요**

이 설계는 **비즈니스 규칙을 코드 내에 직접 구현**하여 유지보수성과 확장성을 극대화하는 것을 목표로 합니다. 다양한 **객체지향 프로그래밍(OOP) 원칙과 SOLID 원칙**을 따르며 시스템의 주요 기능을 명확히 하고, 테스트 용이성을 고려한 구조를 제공합니다.

**➡️ 설계 원칙에 따라 관심사의 분리, 유연한 의존성 관리, 비즈니스 로직 캡슐화 등의 이점을 확보합니다.**

---

## **2. 핵심 설계 원칙의 적용 분석**

### 2.1. **객체지향 프로그래밍(OOP) 원칙**

1. **캡슐화 (Encapsulation)**
    - **엔티티**가 관련된 데이터와 비즈니스 로직을 내부에 캡슐화합니다.
    예: `Book` 객체는 책과 관련된 속성 및 구매 가능 여부(`canBePurchased`) 로직을 포함합니다.
        
        ```tsx
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
        ```
        
2. **상속보다는 조합 (Composition over Inheritance)**
    - 코드의 **확장성을 위해 조합(Composition)**을 사용합니다. 예를 들어, **BookRepository**와 **OrderRepository**는 각각의 기능을 독립적으로 유지하여 코드 재사용성을 높입니다.
3. **다형성 (Polymorphism)**
    - **인터페이스**를 통해 다양한 리포지토리 구현체(예: DB별 구현)를 유연하게 교체할 수 있습니다.

---

### 2.2. **SOLID 원칙의 적용**

1. **단일 책임 원칙 (SRP, Single Responsibility Principle)**
    - 각 클래스와 함수는 **단일 책임**만을 가집니다.
    예: `Book`은 책과 관련된 데이터와 로직을 담당하고, `CreateOrderUseCase`는 주문 처리 로직을 캡슐화합니다.
2. **개방-폐쇄 원칙 (OCP, Open-Closed Principle)**
    - 코드가 **기존 코드를 수정하지 않고 확장**되도록 설계되었습니다.
    예: 새로운 유스케이스(`RefundOrderUseCase`)를 추가할 때 기존 로직을 수정할 필요 없이 새로운 클래스를 정의합니다.
3. **리스코프 치환 원칙 (LSP, Liskov Substitution Principle)**
    - **인터페이스**를 활용하여 구현체를 교체할 수 있도록 설계합니다. 예: `BookRepository`를 다른 데이터베이스로 변경해도 유스케이스는 그대로 동작합니다.
    
    ```tsx
    import { Book } from '../entities/Book';
    
    export interface BookRepository {
      findById(id: string): Promise<Book | null>;
      updateStock(id: string, newQuantity: number): Promise<void>;
    }
    
    ```
    
4. **인터페이스 분리 원칙 (ISP, Interface Segregation Principle)**
    - 리포지토리는 필요한 기능만 제공하도록 **작은 인터페이스**로 나뉩니다.
    예: `BookRepository`와 `OrderRepository`는 각각의 기능에 특화된 인터페이스로 분리됩니다.
5. **의존성 역전 원칙 (DIP, Dependency Inversion Principle)**
    - **유스케이스가 리포지토리 인터페이스에 의존**하고, 구체적인 구현은 의존성 주입을 통해 결정됩니다.**➡️ 고수준 모듈**(유스케이스)이 **저수준 모듈**(데이터 접근 계층)에 의존하지 않도록 합니다.
        
        ```tsx
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
        ```
        

---

## **3. 구조의 상세 분석**

### 3.1. 엔티티(Entity): Book, Order

- **엔티티는 비즈니스 규칙을 포함**합니다.
- 예를 들어, `Book` 객체는 **구매 가능 여부**를 판단하는 로직을 내부 메서드로 캡슐화합니다.**➡️ 이 구조는 객체가 단순한 데이터 집합이 아니라 비즈니스 규칙을 담도록 만듭니다.**

---

### 3.2. 리포지토리 인터페이스: BookRepository, OrderRepository

- **데이터 접근을 추상화**하여 데이터베이스나 외부 서비스의 변경이 도메인 로직에 영향을 주지 않도록 합니다.
- 예: `BookRepository`가 MongoDB에서 PostgreSQL로 변경되더라도, 유스케이스는 변경할 필요가 없습니다.

---

### 3.3. 유스케이스(Use Case): CreateOrderUseCase

- **유스케이스는 비즈니스 로직을 캡슐화**하며, 주문 생성, 재고 확인 등의 기능을 명확히 정의합니다.
- 예:
    
    ```tsx
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
    
    ```
    

---

## **4. 설계의 장점과 효과**

### 4.1. **비즈니스 로직 캡슐화**

- 비즈니스 로직이 **유스케이스와 엔티티 내부에 명확하게 정의**됩니다.
- **데이터베이스나 외부 시스템 변경**이 비즈니스 로직에 영향을 미치지 않습니다.

### 4.2. **테스트 용이성**

- 각 컴포넌트가 독립적이므로 **단위 테스트와 모킹(Mock)을 활용한 통합 테스트**가 쉽습니다.
예: 리포지토리를 모킹하여 데이터베이스 연결 없이 유스케이스를 테스트할 수 있습니다.

---

### 4.3. **확장성과 유지보수성**

- **새로운 유스케이스나 엔티티**를 쉽게 추가할 수 있습니다.
- 인터페이스를 활용하여 **데이터 접근 방식이나 외부 서비스의 변경을 유연하게 대처**할 수 있습니다.

---

### 4.4. **의사소통의 명확성**

- 시스템의 설계가 **비즈니스 요구사항을 코드로 명확하게 표현**합니다.
- 개발자와 비즈니스 전문가 간의 의사소통이 원활해집니다.

---

## **5. 결론**

이 설계는 **객체지향 프로그래밍(OOP)과 SOLID 원칙**을 활용하여 비즈니스 규칙을 코드 내에 포함하고, 각 컴포넌트가 독립적으로 동작하도록 합니다.

- **비즈니스 로직의 명확성**과 **테스트 용이성**을 확보하며,
- **의존성 주입**과 **인터페이스 분리**를 통해 **확장성**과 **유연성**을 극대화합니다.

**➡️ 결과적으로 유지보수성이 높고 테스트하기 쉬운 구조**를 구현하게 됩니다.

---

### **Q&A**

혹시 궁금한 점이나 추가로 알고 싶은 내용이 있으신가요?

---

이 발표 자료는 **OOP와 SOLID 원칙을 기반으로 비즈니스 로직을 캡슐화**한 설계의 이점과 구조를 명확히 설명합니다. **유연성과 유지보수성**을 갖춘 이 구조는 **장기적인 시스템 개발과 확장에 최적화된 접근법**임을 보여줍니다.