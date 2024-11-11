import { Injectable, Inject } from '@nestjs/common';
import { INotificationService } from '../interfaces/notification.interface';
import { IMessage } from '../../common/interfaces/message.interface';
import { NotificationConfig } from '../../config/notification.config';

@Injectable()
export class EmailService implements INotificationService {
  constructor(
    @Inject('NOTIFICATION_CONFIG')
    private config: NotificationConfig
  ) {}

  async send(message: IMessage): Promise<boolean> {
    if (!this.validateMessage(message)) {
      return false;
    }

    try {
      console.log('Sending email:', {
        to: message.to,
        subject: message.subject,
        content: message.content,
        config: this.config.email
      });
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  validateMessage(message: IMessage): boolean {
    return !!(message.to && message.content);
  }
} 