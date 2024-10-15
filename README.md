# Nest.js에서의 OOP와 SOLID 원칙 적용: GPT를 활용한 실습

## 1. 소개

- 발표 주제: Nest.js 환경에서 OOP와 SOLID 원칙을 적용한 코드 생성 실습
- 목적: GPT를 활용하여 Nest.js, OOP, SOLID 원칙 간의 관계와 적용 방법 탐구

## 2. OOP와 SOLID 원칙

### OOP 기본 개념
- 클래스와 객체
- 상속
- 다형성
- 캡슐화

### SOLID 원칙
- SRP (단일 책임 원칙)
- OCP (개방-폐쇄 원칙)
- LSP (리스코프 치환 원칙)
- ISP (인터페이스 분리 원칙)
- DIP (의존성 역전 원칙)

## 3. Nest.js 아키텍처 개요

- **Nest.js는 최신 자바스크립트(또는 타입스크립트)로 작성된 효율적이고 확장 가능한 서버사이드 애플리케이션을 구축하기 위한 프레임워크**
- **Nest.js는 Angular에서 영감을 받아 모듈화, 데코레이터, 의존성 주입 등 다양한 기능을 제공**
- **OOP(Object-Oriented Programming)와 SOLID 원칙을 지원하도록 설계되었지만, 실제로 적용할 때 상충되는 부분이 발생**

### 3.1 핵심 구성 요소

#### a) 모듈 (Module)
- 애플리케이션의 구조를 조직화하는 기본 단위
- `@Module()` 데코레이터를 사용하여 정의
- 관련된 기능을 그룹화하고 경계를 설정

**OOP와의 관련성:**
- **모듈**은 객체 지향 설계에서 **캡슐화**의 개념과 유사합니다.  
- 관련된 컴포넌트(컨트롤러, 서비스, 프로바이더)를 그룹화하고, 외부에서는 모듈을 통해 접근하게 함으로써 경계를 설정합니다.

**SOLID 원칙과의 적용:**
- **SRP (단일 책임 원칙):**  
  - 모듈은 각 도메인에 맞는 기능만을 담당해야 합니다.  
  - 예를 들어, `UserModule`은 사용자 관련 기능만을 포함하며, 이외의 기능은 다른 모듈에서 담당합니다.

- **OCP (개방-폐쇄 원칙):**  
  - 새로운 기능이 필요할 때 모듈을 확장해도 기존 모듈 코드를 수정하지 않습니다.  
  - 예를 들어, `AppModule`에 새로운 `PaymentModule`을 추가하더라도 기존 모듈은 수정할 필요가 없습니다.


**모듈 예시 (OCP, SRP 준수):**

```typescript
@Module({
  imports: [UserModule, PaymentModule], // 모듈 확장
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

#### b) 컨트롤러 (Controller)
- 들어오는 요청을 처리하고 클라이언트에 응답을 반환
- `@Controller()` 데코레이터를 사용하여 정의
- 라우팅 메커니즘을 제공

**OOP와의 관련성:**
- **컨트롤러**는 객체 지향 설계에서 **인터페이스**와 유사합니다.  
- 외부 요청을 처리하고 비즈니스 로직을 실행하는 서비스로 연결해주는 역할을 합니다.

**SOLID 원칙과의 적용:**
- **SRP (단일 책임 원칙):**  
  - 컨트롤러는 **HTTP 요청/응답 처리**에만 집중해야 하며, 비즈니스 로직을 서비스로 위임합니다.  
  - 요청 처리 외의 책임을 가지면 SRP를 위반하게 됩니다.

- **OCP (개방-폐쇄 원칙):**  
  - 새로운 요청이 필요하면 기존 컨트롤러를 수정하는 대신, **새로운 라우팅 메서드**를 추가합니다.


**컨트롤러 예시 (SRP 준수):**

```typescript
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }
}
```

#### c) 서비스 (Service)
- 비즈니스 로직을 포함하는 클래스
- `@Injectable()` 데코레이터를 사용하여 정의
- 싱글톤으로 구현되어 애플리케이션 전체에서 공유 가능

**서비스 예시 (DIP, SRP 준수):**

```typescript
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(userDto: CreateUserDto) {
    const user = new User(userDto.name, userDto.age);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.findAll();
  }
}
```

**논의:**
- **SRP 준수:** 서비스는 사용자 생성과 조회에 관한 로직만을 담당합니다.
- **DIP 준수:** 서비스는 구체적인 저장 방식에 의존하지 않고, 리포지토리 인터페이스를 통해 의존성을 주입받습니다.


#### d) 프로바이더 (Provider)
- Nest.js의 기본 개념으로, 대부분의 클래스가 프로바이더로 취급될 수 있음
- 서비스, 리포지토리, 팩토리, 헬퍼 등이 프로바이더가 될 수 있음
- 의존성으로 주입 가능

**OOP와의 관련성:**
- 프로바이더는 객체 생성 및 의존성 관리를 담당하며, **의존성 주입**을 통해 구성됩니다.  
- Nest.js에서는 모든 클래스가 프로바이더로 간주될 수 있으며, 이는 **구성(Composition)**을 적극적으로 활용하는 예입니다.

**SOLID 원칙과의 적용:**
- **DIP (의존성 역전 원칙):**  
  - 프로바이더는 고수준 모듈이 저수준 모듈에 의존하지 않도록, 인터페이스나 추상 클래스를 주입받도록 설계됩니다.

- **ISP (인터페이스 분리 원칙):**  
  - 각 프로바이더는 필요한 메서드만 포함하는 작은 인터페이스에 의존하게 합니다.

**프로바이더 예시 (DIP, ISP 준수):**

```typescript
@Injectable()
export class UserRepository {
  private users: User[] = [];

  save(user: User): User {
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }
}
```

**논의:**
- **DIP 준수:** 서비스는 `UserRepository`의 인터페이스를 통해 저장소에 의존합니다.
- **ISP 준수:** 리포지토리는 사용자 저장과 조회에 필요한 메서드만 포함합니다.

### 3.2 의존성 주입 (Dependency Injection) 시스템

Nest.js는 강력한 의존성 주입 시스템을 제공합니다.

- 생성자 기반 주입: 클래스의 생성자에 의존성을 선언
- 모듈 레벨에서 프로바이더 등록
- 순환 의존성 해결을 위한 기능 제공

예시:
```typescript
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
```

### **Nest.js와 SOLID 원칙 상충점 논의**

1. **DIP (의존성 역전 원칙)과 인터페이스 주입의 한계:**  
   - TypeScript에서는 인터페이스가 런타임에 존재하지 않기 때문에, Nest.js는 인터페이스 기반 주입을 직접 지원하지 않습니다.  
   - **해결 방안:** 추상 클래스나 토큰을 사용해 의존성을 주입합니다.

2. **SRP와 서비스/컨트롤러의 역할 분리:**  
   - 컨트롤러에 비즈니스 로직이 포함되면 SRP가 깨질 수 있습니다.  
   - **해결 방안:** 비즈니스 로직은 항상 서비스로 위임하고, 컨트롤러는 요청과 응답에만 집중합니다.

3. **싱글톤 서비스와 상태 관리 문제:**  
   - Nest.js에서는 서비스가 기본적으로 싱글톤으로 관리되기 때문에, 상태를 가지는 서비스는 부작용을 일으킬 수 있습니다.  
   - **해결 방안:** 상태가 필요한 경우 **요청 범위(Scope.REQUEST)**로 설정하거나 외부 상태 관리 시스템을 사용합니다.

## 4. 간단한 Nest.js 블로그 구현 및 OOP, SOLID 원칙 분석 

### 프로젝트 개요

간단한 블로그 시스템을 구현하며, 게시글 작성, 조회, 수정, 삭제 기능을 포함합니다.

---

### 프로젝트 구조

- **`PostsModule`**: 게시글 관련 컴포넌트를 모은 모듈
- **`PostsController`**: HTTP 요청을 처리하는 컨트롤러
- **`PostsService`**: 비즈니스 로직을 담당하는 서비스
- **`CreatePostDto`, `UpdatePostDto`**: 데이터 전송 객체(DTO)
- **`Post` 엔티티 클래스**: 게시글 엔티티 정의
- **`IRepository<T>` 인터페이스**: 제네릭 리포지토리 인터페이스
- **`PostsRepository`**: 게시글 리포지토리 구현체

---

### 코드 구현 및 논의

#### 4.1. posts.module.ts

```typescript
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
```

**기능 설명:**

- `PostsModule`은 컨트롤러, 서비스, 리포지토리를 묶어주는 모듈입니다.
- `PostsRepository`를 직접 프로바이더로 등록합니다.

**상충점 및 논의:**

- **의존성 역전 원칙(DIP)과 Nest.js의 한계:**
  - **문제점:** Nest.js에서는 인터페이스에 대한 의존성 주입을 지원하지 않습니다. 이는 TypeScript의 인터페이스가 런타임에 존재하지 않기 때문입니다.
  - **상충점:** DIP를 완전히 준수하려면 서비스가 인터페이스에 의존하고, 구현체는 의존성 주입으로 제공되어야 하지만, Nest.js에서는 인터페이스를 토큰으로 사용할 수 없습니다.
  - **해결 방안:** 추상 클래스나 문자열 토큰을 사용하여 의존성을 주입하지만, 이는 완벽한 해결책이 아닙니다.

**예시 코드:**

```typescript
// 추상 클래스 사용
export abstract class PostsRepositoryInterface {
  abstract save(post: Post): Promise<Post>;
  // 기타 메서드 정의
}

// 모듈에서 의존성 주입
@Module({
  controllers: [PostsController],
  providers: [
    PostsService,
    {
      provide: PostsRepositoryInterface,
      useClass: PostsRepository,
    },
  ],
})
export class PostsModule {}
```

**하지만 여전히 추상 클래스는 런타임에 존재하기 때문에 완벽한 DIP 준수가 어렵습니다.**

---

#### 4.2. posts.service.ts

```typescript
import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(post: Post): Promise<Post> {
    return this.postsRepository.save(post);
  }

  // 기타 메서드 생략
}
```

**상충점 및 논의:**

- **의존성 역전 원칙(DIP)과 인터페이스 기반 프로그래밍의 한계:**
  - **문제점:** 서비스가 구체적인 클래스 `PostsRepository`에 의존하고 있습니다.
  - **Nest.js의 한계:** 인터페이스에 대한 의존성 주입이 어렵기 때문에, 추상화를 위해 추상 클래스나 토큰을 사용해야 하지만, 이는 완벽한 인터페이스 기반 프로그래밍을 제공하지 않습니다.
  - **OOP 원칙과의 상충:** 인터페이스를 통한 의존성 역전이 어렵기 때문에, 구현체에 대한 의존성을 완전히 제거하기 어렵습니다.

---

#### 4.3. posts.repository.ts

```typescript
import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';

@Injectable()
export class PostsRepository {
  private posts: Post[] = [];

  async save(post: Post): Promise<Post> {
    this.posts.push(post);
    return post;
  }

  // 기타 메서드 생략
}
```

**상충점 및 논의:**

- **의존성 역전 원칙(DIP)과 구현체 의존성:**
  - **문제점:** 리포지토리가 인터페이스나 추상 클래스를 구현하지 않고 있습니다.
  - **Nest.js의 특징:** 리포지토리 자체가 서비스로서 동작하며, 인터페이스를 통한 추상화가 어렵습니다.
  - **해결 방안:** 리포지토리를 추상 클래스로 정의하고, 구현체를 제공하려 하지만, 런타임에 타입 정보가 없어 한계가 있습니다.

---

#### 4.4. post.entity.ts

```typescript
export class Post {
  constructor(public id: string, public title: string, public content: string) {}
}
```

**상충점 및 논의:**

- **엔티티 클래스와 데이터 매핑:**
  - **문제점:** Nest.js에서는 엔티티를 클래스나 인터페이스로 정의할 수 있지만, 데이터베이스 연동 시 ORM(Entity Framework)과의 호환성 문제로 인해 복잡해질 수 있습니다.
  - **OOP 원칙과의 상충:** 엔티티를 순수한 객체로 유지하려면 데이터베이스 종속성을 제거해야 하지만, 현실적으로 어려울 수 있습니다.
  - **해결 방안:** ORM을 사용하여 엔티티를 정의하지만, 이로 인해 엔티티 클래스가 ORM의 데코레이터로 오염될 수 있습니다.

**예시 코드 (TypeORM 사용 시):**

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;
}
```

**상충점:**

- **데코레이터로 인한 캡슐화 위반:**
  - 엔티티 클래스가 ORM의 데코레이터로 오염되어, 순수한 도메인 객체로서의 역할이 희석됩니다.
  - OOP의 캡슐화 원칙과 상충됩니다.

---

#### 4.5. posts.controller.ts

```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postsService.create(post);
  }

  // 기타 메서드 생략
}
```

**상충점 및 논의:**

- **데코레이터의 과도한 사용과 메타프로그래밍:**
  - **문제점:** 데코레이터를 통해 메서드와 파라미터의 메타데이터를 정의합니다.
  - **OOP 원칙과의 상충:** 데코레이터는 함수형 프로그래밍에서 유래된 개념으로, OOP의 순수성을 저해할 수 있습니다.
  - **캡슐화와의 상충:** 데코레이터를 통해 클래스 외부에서 내부 동작에 영향을 줄 수 있어 캡슐화를 위반할 수 있습니다.
  - **해결 방안:** Nest.js의 철학을 받아들이고, 데코레이터의 역할을 명확히 이해하며 사용합니다.

---

#### 4.6. 의존성 주입과 싱글톤 패턴의 강제

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  // 메서드 생략
}
```

**상충점 및 논의:**

- **싱글톤 패턴의 강제와 전역 상태 관리:**
  - **문제점:** Nest.js에서 서비스는 기본적으로 싱글톤으로 동작합니다.
  - **OOP 원칙과의 상충:** 싱글톤 패턴은 전역 상태를 관리하게 되어, 객체 지향의 캡슐화와 모듈화 원칙을 위반할 수 있습니다.
  - **SOLID 원칙과의 상충:** 전역 상태로 인해 예상치 못한 부작용이 발생하여 SRP와 OCP를 위반할 수 있습니다.
  - **해결 방안:** 요청 스코프(`Scope.REQUEST`)를 사용하여 인스턴스 생성을 제어하지만, 이는 성능에 영향을 줄 수 있습니다.

---

#### 4.7. 인터페이스 기반 프로그래밍의 제한

**상충점 및 논의:**

- **TypeScript의 인터페이스 한계:**
  - **문제점:** 인터페이스는 컴파일 타임에만 존재하며, 런타임에는 제거됩니다.
  - **Nest.js의 의존성 주입:** 런타임에 존재하는 타입(클래스나 토큰)만 의존성 주입이 가능합니다.
  - **DIP의 완전한 구현 어려움:** 인터페이스를 통한 완전한 의존성 역전이 어렵습니다.
  - **해결 방안:** 추상 클래스나 토큰을 사용하지만, 이는 인터페이스의 장점을 완전히 살리지 못합니다.

---

### 종합 논의

#### Nest.js의 특징으로 인한 OOP, SOLID 원칙의 상충점 요약

1. **의존성 주입과 인터페이스의 한계:**

   - **상충점:** TypeScript의 인터페이스는 런타임에 존재하지 않으므로, Nest.js의 DI 컨테이너에서 사용할 수 없습니다.
   - **결과:** DIP를 완벽하게 구현하기 어렵고, 구현체에 대한 의존성을 완전히 제거할 수 없습니다.

2. **데코레이터의 사용과 캡슐화 위반:**

   - **상충점:** 데코레이터를 통해 클래스 외부에서 내부 동작에 영향을 줄 수 있어, 캡슐화 원칙을 위반할 수 있습니다.
   - **결과:** 객체의 상태와 동작이 명시적이지 않게 되어, 코드의 예측 가능성이 떨어집니다.

3. **싱글톤 서비스와 전역 상태 관리:**

   - **상충점:** 서비스가 기본적으로 싱글톤으로 동작하여, 전역 상태를 관리하게 됩니다.
   - **결과:** 예상치 못한 부작용이 발생할 수 있으며, SRP와 OCP를 위반할 수 있습니다.

4. **엔티티 클래스의 데코레이터 오염:**

   - **상충점:** ORM의 데코레이터로 인해 엔티티 클래스가 오염되어, 순수한 도메인 객체로서의 역할이 희석됩니다.
   - **결과:** OOP의 캡슐화와 추상화 원칙이 손상됩니다.

5. **인터페이스 기반 프로그래밍의 제한:**

   - **상충점:** 인터페이스는 런타임에 존재하지 않으므로, 의존성 주입에서 활용하기 어렵습니다.
   - **결과:** DIP와 ISP를 완벽하게 구현하기 어렵습니다.

#### 이러한 상충점의 불가피성

- **프레임워크와 언어의 제한:**

  - Nest.js는 TypeScript의 한계를 가지고 있으며, 런타임에 인터페이스 정보를 사용할 수 없습니다.
  - 데코레이터는 Nest.js의 핵심 기능으로, 이를 완전히 배제할 수 없습니다.

- **실용성과 생산성의 선택:**

  - 현실적인 애플리케이션 개발에서는 생산성과 개발 효율성이 중요합니다.
  - Nest.js는 개발 편의성을 높이기 위해 일부 OOP와 SOLID 원칙의 엄격한 적용을 완화했습니다.

#### 개발 시 고려 사항

- **원칙의 균형 잡힌 적용:**

  - 모든 원칙을 100% 준수하는 것보다, 현실적인 제약 하에서 최선을 다해 적용하는 것이 중요합니다.
  - 프레임워크의 특징과 장점을 활용하면서도, 가능한 범위 내에서 원칙을 지키도록 노력합니다.

- **코드의 명확성과 유지 보수성:**

  - 데코레이터와 의존성 주입을 사용할 때, 코드의 명확성과 예측 가능성을 높이기 위해 문서화와 코드 컨벤션을 준수합니다.
  - 전역 상태 관리에 주의하고, 필요한 경우 상태를 외부로 분리하거나 스코프를 조정합니다.

- **팀 내 공유와 교육:**

  - 이러한 상충점에 대해 팀원들과 공유하고, 일관된 코딩 스타일과 원칙을 확립합니다.
  - Nest.js의 특징과 한계를 이해하고, 이에 맞는 설계와 구현 방식을 논의합니다.

---

### 결론

Nest.js에서 OOP와 SOLID 원칙을 적용할 때, 프레임워크의 특징과 언어의 한계로 인해 어쩔 수 없이 상충되는 부분이 발생할 수 있습니다. 이러한 상충점은 주로 다음과 같습니다:

- **인터페이스 기반 프로그래밍의 제한으로 인한 DIP와 ISP의 완전한 구현 어려움**
- **데코레이터의 필수 사용으로 인한 캡슐화 원칙의 부분적인 위반**
- **서비스의 싱글톤 패턴 강제로 인한 전역 상태 관리와 SRP, OCP 위반 가능성**
- **엔티티 클래스의 ORM 데코레이터 오염으로 인한 순수한 도메인 모델 구현의 어려움**

이러한 상충점은 Nest.js의 설계와 TypeScript의 한계로 인해 불가피한 부분이 있습니다. 개발자는 이러한 한계를 이해하고, 현실적인 범위 내에서 OOP와 SOLID 원칙을 최대한 준수하도록 노력해야 합니다.

**핵심 요약:**

- **Nest.js의 특징으로 인해 일부 OOP와 SOLID 원칙과의 상충이 불가피합니다.**
- **개발자는 이러한 상충점을 인지하고, 가능한 범위 내에서 원칙을 준수하도록 설계와 구현을 조정해야 합니다.**
- **팀 내의 공유와 문서화를 통해 코드의 명확성과 유지 보수성을 높일 수 있습니다.**

---

이렇게 전체적으로 코드를 수정하여 Nest.js의 특징으로 인해 어쩔 수 없이 OOP와 SOLID 원칙과 상충되는 부분을 포함시켰습니다. 각 코드에서 이러한 상충점을 보여드렸고, 이에 대해 논의하였습니다.