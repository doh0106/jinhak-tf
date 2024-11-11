import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

// DI: 컨트롤러에 NotificationService 주입
// 1. 컨트롤러는 추상화된 서비스에만 의존
// 2. 구체적인 알림 방식(이메일, SMS)을 알 필요가 없음
@Controller('notifications')
export class NotificationController {
  // DI: 생성자 주입을 통한 서비스 의존성 주입
  // DIP: 구체적인 구현이 아닌 추상화된 서비스에 의존
  constructor(private readonly notificationService: NotificationService) {}

  // 각 엔드포인트는 DTO를 통해 데이터를 받고 서비스에 위임
  @Post('email')
  async sendEmail(@Body() createNotificationDto: CreateNotificationDto) {
    const result = await this.notificationService.sendEmail(createNotificationDto);
    return { success: result };
  }

  @Post('sms')
  async sendSms(@Body() createNotificationDto: CreateNotificationDto) {
    const result = await this.notificationService.sendSms(createNotificationDto);
    return { success: result };
  }

  @Post('multi')
  async sendMultiChannel(@Body() createNotificationDto: CreateNotificationDto) {
    const results = await this.notificationService.sendMultiChannel(createNotificationDto);
    return { success: results.every(result => result) };
  }
}