import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { NotificationController } from './notification.controller';

// DI: 알림 관련 모든 의존성을 캡슐화하는 모듈
// 1. 모듈 단위로 의존성 그래프 구성
// 2. 관련된 컴포넌트들을 하나의 단위로 묶어 응집도 향상
@Module({
  controllers: [NotificationController],  // 컨트롤러 등록
  providers: [
    NotificationService,   // 주요 서비스 등록
    EmailService,         // 이메일 구현체 등록
    SmsService           // SMS 구현체 등록
  ],
  exports: [NotificationService]  // 다른 모듈에서 사용할 수 있도록 export
})
export class NotificationModule {} 