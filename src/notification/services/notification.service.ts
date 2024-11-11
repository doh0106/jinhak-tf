import { Injectable } from '@nestjs/common';
import { INotificationService } from '../interfaces/notification.interface';
import { IMessage } from '../../common/interfaces/message.interface';
import { EmailService } from './email.service';
import { SmsService } from './sms.service';

// DI: 파사드 패턴을 통한 알림 서비스 통합
// 1. 여러 알림 서비스를 단일 인터페이스로 통합
// 2. 클라이언트 코드와 구체적인 알림 서비스 사이의 추상화 계층
@Injectable()
export class NotificationService {
  // DI: 생성자 주입을 통한 구체적인 서비스 주입
  // 1. 각 서비스는 자신의 인터페이스를 통해 주입됨
  // 2. 새로운 알림 채널 추가 시 여기만 수정하면 됨
  constructor(
    private readonly emailService: EmailService,
    private readonly smsService: SmsService
  ) {}

  // 각 서비스별 메서드 제공
  // DIP: 구체적인 구현은 주입된 서비스에 위임
  async sendEmail(message: IMessage): Promise<boolean> {
    return await this.emailService.send(message);
  }

  async sendSms(message: IMessage): Promise<boolean> {
    return await this.smsService.send(message);
  }

  // 복합 기능: 여러 채널 동시 발송
  // DIP: 추상화된 인터페이스를 통해 구현되어 확장 용이
  async sendMultiChannel(message: IMessage): Promise<boolean[]> {
    const results = await Promise.all([
      this.sendEmail(message),
      this.sendSms(message)
    ]);
    return results;
  }
} 