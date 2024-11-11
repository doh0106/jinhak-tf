# NestJS를 활용한 DIP/DI 실전 적용 사례

## 1. 핵심 아키텍처 설계

### 1.1 계층 구조
```
Controller -> NotificationService -> Concrete Services (Email, SMS)
```

### 1.2 핵심 추상화 계층
```typescript
// 모든 메시지의 기본 형식 정의
interface IMessage {
  to: string;
  subject?: string;
  content: string;
}

// 모든 알림 서비스가 구현해야 하는 인터페이스
interface INotificationService {
  send(message: IMessage): Promise<boolean>;
  validateMessage(message: IMessage): boolean;
}
```

## 2. DIP 적용 분석

### 2.1 고수준 정책과 저수준 구현의 분리
```typescript
// 고수준 모듈: NotificationService
@Injectable()
export class NotificationService {
  constructor(
    private readonly emailService: EmailService,
    private readonly smsService: SmsService
  ) {}
}

// 저수준 모듈: 구체적인 구현체
@Injectable()
export class EmailService implements INotificationService {
  async send(message: IMessage): Promise<boolean> {
    // 구체적인 이메일 발송 로직
  }
}
```

### 2.2 확장성 있는 구조
- 새로운 알림 채널 추가 시 INotificationService만 구현하면 됨
- 기존 코드 수정 없이 새로운 기능 추가 가능

## 3. NestJS의 DI 지원 활용

### 3.1 데코레이터 기반 DI
```typescript
@Injectable()  // 의존성 주입 가능한 클래스임을 선언
export class EmailService implements INotificationService {
  constructor(
    @Inject('NOTIFICATION_CONFIG')  // 토큰 기반 의존성 주입
    private config: NotificationConfig
  ) {}
}
```

### 3.2 모듈 단위의 의존성 관리
```typescript
@Module({
  providers: [
    NotificationService,
    EmailService,
    SmsService
  ],
  exports: [NotificationService]
})
export class NotificationModule {}
```

### 3.3 동적 설정 주입
```typescript
export class ConfigModule {
  static forRoot(config: Partial<NotificationConfig> = {}): DynamicModule {
    return {
      module: ConfigModule,
      providers: [{
        provide: 'NOTIFICATION_CONFIG',
        useValue: {
          ...defaultConfig,
          ...config,
        },
      }],
      global: true
    };
  }
}
```

## 4. 실제 적용의 이점

1. **테스트 용이성**
   - 인터페이스를 통한 Mock 객체 생성 가능
   - 각 컴포넌트 독립적 테스트 가능

2. **유지보수성**
   - 구현체 교체가 용이
   - 의존성이 명확히 드러남

3. **확장성**
   - 새로운 알림 채널 추가가 쉬움
   - 기존 코드 수정 없이 기능 확장 가능

## 5. 결론

NestJS의 DI 시스템과 DIP 원칙을 결합하여:
- 느슨한 결합
- 높은 응집도
- 테스트 용이성
- 확장 가능한 구조

를 달성할 수 있었습니다.

이러한 구조는 실제 프로덕션 환경에서 유연하고 견고한 시스템을 구축하는데 매우 효과적입니다.