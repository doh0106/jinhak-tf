// DIP: 고수준 모듈과 저수준 모듈 사이의 추상화 계층
// 1. 메시지 형식에 대한 계약 정의를 통해 구현 세부사항으로부터 격리
// 2. 모든 알림 타입(이메일, SMS 등)이 따라야 하는 공통 인터페이스
// 3. 새로운 메시지 타입 추가 시 이 인터페이스만 준수하면 됨
export interface IMessage {
  to: string;          // 수신자 정보
  subject?: string;    // 제목 (선택적)
  content: string;     // 내용
} 