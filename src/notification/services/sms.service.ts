import { Injectable, Inject } from '@nestjs/common';
import { INotificationService } from '../interfaces/notification.interface';
import { IMessage } from '../../common/interfaces/message.interface';
import { NotificationConfig } from '../../config/notification.config';

@Injectable()
export class SmsService implements INotificationService {
  constructor(
    @Inject('NOTIFICATION_CONFIG')
    private config: NotificationConfig
  ) {}

  async send(message: IMessage): Promise<boolean> {
    if (!this.validateMessage(message)) {
      return false;
    }

    try {
      console.log('Sending SMS:', {
        to: message.to,
        content: message.content,
        config: this.config.sms
      });
      return true;
    } catch (error) {
      console.error('SMS sending failed:', error);
      return false;
    }
  }

  validateMessage(message: IMessage): boolean {
    return !!(message.to && message.content);
  }
} 