import { IMessage } from '../../common/interfaces/message.interface';

// DIP: 알림 서비스의 핵심 추상화 계층
// 1. 고수준 정책 정의: 모든 알림 서비스의 표준 동작 방식 규정
// 2. 구체적인 구현(이메일, SMS 등)은 이 인터페이스에 의존
// 3. 인터페이스 분리 원칙(ISP)도 적용: 알림 서비스에 필요한 최소한의 메서드만 정의
export interface INotificationService {
  // 메시지 전송의 추상화된 동작 정의
  send(message: IMessage): Promise<boolean>;
  // 메시지 유효성 검증의 추상화된 동작 정의
  validateMessage(message: IMessage): boolean;
} 